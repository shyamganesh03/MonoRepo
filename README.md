# Izzo

Izzo is an event ticket booking application designed for concerts, parties, and various events. The app features age restrictions for events and provides a comprehensive, user-friendly experience for browsing, booking, and managing event tickets.

# Modules

## Login Module

**Initial Screen**

- Enter an email to validate if it has an account.
- If the email is associated with an account, navigate to the Login Screen.
- Otherwise, navigate to the Registration Screen.

**Login Screen**

- Enter user email and password.
- Navigate to the Home Screen upon successful login.

**Registration Screen**

- **_Step 1:_** Enter first name, last name, and email (pre-populated from the initial screen).
- **_Step 2:_** Provide address and region.
- **_Step 3:_** Create a password and submit to complete registration.

## Home Screen

- Display today's events, genres, weekly events, and news.
- Show 8 event cards for each section in a horizontal and 4 blog/news cards.

## View All Screen

Display all data for a selected category.

## Maps

- View the location of each event.
- Filter events and navigate to them.

## Search Screen

- Search for events and blogs.
- Apply filters to refine search results.

## Profile

- Sign out if the user is logged in.
- Options for profile settings, notification settings, and saved events.

## Event Detail

View detailed information about a selected event.

# Get Started

To get started with this project, clone the repository to your local machine and install the dependencies using yarn

**Clone this Repo**

```
git clonehttps://github.com/increscotech/izzo-app.git
```

**Run yarn command from root folder**

```
yarn
```

## Folder Structure

```
    │
    ├── apps
    │   ├── mobile
    │   └── web
    │
    ├── libs
    │   ├── ui-components
    │   ├── icons
    │   └── theme
    |   └── skeletons
    │
    ├── packages
    │   ├── core
    │   └── shared-hooks
    |   └── shared-translation
    │
    │
    ├── package.json
    ├── .gitignore
    └── README.md
```

# App Link

The details for deployed app will be Update later...

# Figma

[Izzo](https://www.figma.com/design/TCySYmVMRjCqXX87ChXKNz/IZZO-App-Design-System?node-id=51-2884&t=wt197lZ4aMgrlaWG-0)

## Commands

| Command        | Action                                  |
| :------------- | :-------------------------------------- |
| `yarn`         | install the required dependencies       |
| `yarn web`     | run the project in web `localhost:3000` |
| `yarn android` | run the application android emulator    |
| `yarn ios`     | run the application ios emulator        |
| `yarn start`   | start the metro bundle                  |
