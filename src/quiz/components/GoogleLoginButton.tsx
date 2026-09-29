import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../../firebase";

type Props = {
  user: User | null;
};

export const GoogleLoginButton = ({ user }: Props) => {
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log(result.user.uid);
      console.log(result.user.displayName);
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <button
        onClick={user ? logout : login}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-2
          text-gray-700
          shadow-sm
          transition
          hover:bg-gray-50
          hover:shadow-md
        "
      >
        {user ? (
          <>
            {user.photoURL && (
              <img
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                src={user.photoURL}
              />
            )}
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">{user.displayName}</span>
              <span className="text-xs text-gray-500">ログアウト</span>
            </div>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.3-11.4-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.4-6 7l6.2 5.2C39 37.1 44 31.1 44 24c0-1.3-.1-2.4-.4-3.5z"
              />
            </svg>
            <span className="font-medium">Googleでログイン</span>
          </>
        )}
      </button>
    </div>
  );
};
