import type { User } from "firebase/auth";
import googleLogo from "../../assets/google.svg";

type Props = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const GoogleLoginButton = ({ user, login, logout }: Props) => {

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
            <img className="h-5 w-5" src={googleLogo} />
            <span className="font-medium">Googleでログイン</span>
          </>
        )}
      </button>
    </div>
  );
};
