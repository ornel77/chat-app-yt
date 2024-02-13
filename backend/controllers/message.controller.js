import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // renommer en receiverId
    const senderId = req.user._id;

    // Find the convo between the users
    let conversation = await Conversation.findOne({
      participants: {
        // find the convo where participants array includes all the fields
        $all: [senderId, receiverId], //mongoose syntax
      },
    });

    // si la convo n'existe pas on en crée une entre ces 2 users
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // si message bien créé on push l'id du message
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()
    // await newMessage.save()
    
    // To optimize these two await we can run theme in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    
    // SOCKET IO FUNCTIONALITY WILL GO HERE
    // send the msg to the other user
    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId) {
      // not emit because we want to send the msg to a specific user
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }


    res.status(201).json(newMessage);
  } catch (error) {
    console.log('error in sendMessage controller', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; //the person we chat with
    const senderId = req.user._id; //the person who is logged in

    // retreive the convo between them and populate the message field with the content of those messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages'); //NOT REFERECES BUT ACTUAL MESSAGES

    if (!conversation) {
      return res.status(200).json([]);
    } else {
      const messages = conversation.messages;

      res.status(200).json(messages);
    }
  } catch (error) {
    console.log('error in sendMessage controller', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
