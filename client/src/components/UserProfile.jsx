import getInitials from "../utils/getInitials";

function UserProfile({ user: { data } }) {
  console.log(data);
  return (
    <div className="w-87.5 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl mb-4 uppercase tracking-tighter">
          {getInitials(data?.name)}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{data?.name}</h2>
        <span className="mt-1 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-full">
          {data?.role}
        </span>
        <p className="mt-4 text-gray-500 text-sm">{data?.email}</p>
        <button className="mt-6 w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
