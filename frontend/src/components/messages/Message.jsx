import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser._id === message.senderId;
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const shakeClass = message.shouldShake ? "shake" : ""

  const formattedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='chat bubble component' />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 pt-1 items-center'>
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
