export default function UserProfile({ params }: any) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-3">
        <h1>Profile</h1>
        <hr />
        <p className="text-3xl">
          Profile page{" "}
          <span className="text-4xl text-red-600">{params.id}</span> does n't
          exist
        </p>
      </div>
    </>
  );
}
