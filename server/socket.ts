import { Server } from 'socket.io';
import { createServer } from 'http';
import { db } from '~/lib/db/db';
import { usersTable, messagesTable } from '~/lib/db/schema/schema';

const httpServer = createServer();
export const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('New user connected', socket.id);

  // Load recent messages
  socket.emit('init', db.select().from(messagesTable).limit(20));

  // Handle new messages
  socket.on('message', async ({ userId, content }) => {
    const result = await db.insert(messagesTable).values({ userId, content });
    const msg = await db.select().from(messagesTable).where(messagesTable.id.eq(result.id));
    io.emit('message', msg[0]);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// Export server for Nuxt
export default httpServer;
