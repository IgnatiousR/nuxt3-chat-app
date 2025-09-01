<template>
  <div>
    <div v-for="msg in messagesTable" :key="msg.id">
      <strong>{{ msg.userId }}:</strong> {{ msg.content }}
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type..." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { messagesTable } from '~/lib/db/schema/schema';
const messages = ref([]);
const newMessage = ref('');
const { $socket } = useNuxtApp();

// Load initial messages
onMounted(() => {
  $socket.on('init', (msgs: any) => {
    messages.value = msgs;
  });

  $socket.on('message', (msg: any) => {
    messages.value.push(msg);
  });
});

const sendMessage = () => {
  if (!newMessage.value) return;
  $socket.emit('message', { userId: 1, content: newMessage.value }); // hardcoded userId for now
  newMessage.value = '';
};
</script>