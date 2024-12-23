// import { connectDB } from './index';
// import { UserModel } from './models/User';
// import { TicketModel } from './models/Ticket';

// export const seedDatabase = async () => {
//     await connectDB();

//     const users = [
//         { name: 'John Doe', email: 'john@example.com', password: 'password123' },
//         { name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
//     ];

//     const tickets = [
//         { title: 'Bug Report', description: 'App crashes on login', status: 'open' },
//         { title: 'Feature Request', description: 'Add dark mode', status: 'closed' },
//     ];

//     await UserModel.insertMany(users);
//     await TicketModel.insertMany(tickets);

//     console.log('Database seeded successfully');
// };
