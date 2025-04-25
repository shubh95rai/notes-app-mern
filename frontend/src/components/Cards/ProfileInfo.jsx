import { getInitials } from "../../utils/helper";

export default function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 sm:size-12 rounded-full bg-slate-100 font-medium flex items-center justify-center ">
        {getInitials(userInfo?.name)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.name}</p>
        <button
          className="text-sm text-slate-700 underline underline-offset-2"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
