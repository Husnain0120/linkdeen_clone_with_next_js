import PostForm from '@/components/PostForm';
import { Show } from '@clerk/nextjs';

const page = () => {
  return (
    <span>
      <Show when={'signed-in'}>
        <PostForm />
      </Show>
    </span>
  );
};

export default page;
