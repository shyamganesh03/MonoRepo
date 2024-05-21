import { Platform } from 'react-native';
import urlOpener from './urlOpener';

const config = {
  aws_project_region: 'ap-south-1',
  aws_appsync_graphqlEndpoint: '',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_cognito_identity_pool_id: 'ap-south-1:e6efc1d6-3bba-4ab4-a7f3-fbd0b3b56fa5',
  aws_cognito_region: 'ap-south-1',
  aws_user_pools_id: 'ap-south-1_Tlmb32szP',
  aws_user_pools_web_client_id: '39iccidfj5grl151t8blhv1u3l',
  oauth: {
    domain: 'betacognito.edvanza.com',
    redirectSignIn: Platform.OS === 'web' ? `${window.location.origin}/login` : 'edvanza://',
    redirectSignOut: Platform.OS === 'web' ? `${window.location.origin}/login` : 'edvanza://',
    responseType: 'code',
    scope: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    urlOpener,
  },
  API: {
    endpoints: [
      {
        name: 'edvanza',
        endpoint: `https://main-api.edvanza.com`,
        region: 'ap-south-1',
      },
      {
        name: 'social',
        endpoint: 'https://main-gql.edvanza.com/graphql',
        region: 'ap-south-1',
        service: 'appsync',
      },
      {
        name: 'notification',
        endpoint: 'https://main-notification-gql.edvanza.com/graphql',
        region: 'ap-south-1',
      },
    ],
  },
};

export default config;
