import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';
import AWSConfig from '../../src/aws-exports';

export const saveInKinesis = async (recordData) => {
  const client = new KinesisClient({
    region: AWSConfig.aws_project_region,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: AWSConfig.aws_project_region },
      identityPoolId: AWSConfig.aws_cognito_identity_pool_id,
    }),
  });

  const data = { ...recordData, ...{ timestamp: Date.now() } };
  const d = await client.send(
    new PutRecordCommand({
      Data: Buffer.from(JSON.stringify(data)),
      PartitionKey: '1',
      StreamName: 'main-KinesisStream',
    })
  );
};
