# Consumer-App

## Introduction

"Consumer-App" is a GUI application designed for consumers to manage their parcel deliveries efficiently and securely. Hosted on Azure Static Web Apps, this React-based app offers an intuitive interface for users to send, receive, and track parcels through a network of parcel lockers.

Live App: [Consumer-App on Azure](https://brave-mushroom-05bf9d003.4.azurestaticapps.net)

## Key Features

### User Signup and Sign In

- **User Signup**: Enables new users to create an account with a username and password.
- **User Sign In**: Secure authentication system to identify users based on their credentials.

### Parcel Management

- **Parcel Information and History**: Users can view detailed information and history of sent and received parcels, including sender/recipient details, pickup and drop-off timings, parcel status, and retrieval codes for lockers.
- **Notifications**: Notification system alerts users about parcels ready for pickup.

### Account and Parcel Handling

- **Account Deletion**: Users can delete their accounts while maintaining the integrity of parcel data in the system.
- **Send New Parcel**: Functionality to send new parcels, including input fields for parcel dimensions, mass, recipient/sender details, and location selection from available parcel lockers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

### Installing

1. **Clone and Navigate**:
   ```bash
   git clone https://github.com/Speed-Delivery/consumer-app.git
   cd consumer-app
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   ```bash
   npm start
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

## Deployment

Push your changes to the main branch to trigger the Azure Static Web Apps CI/CD pipeline for deployment.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) - Hosting platform

## Authors

- **Mussa Muna**
- **Nafisa Akter**
- **Gebrehiwot Matusala**
- **Mst Airen Aktar**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- To All team members. Thank you for your hard work and dedication to this project.
