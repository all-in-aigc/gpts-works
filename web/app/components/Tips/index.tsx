export default () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mx-auto text-center">
      <a
        href="/dashboard/submit-gpts"
        target="_self"
        className="inline-block text-sm text-primary mx-2 mt-4"
      >
        Submit your awesome GPTs 👉
      </a>
      <a className="hidden md:inline-block text-sm text-slate-300 mx-2 mt-4">
        |
      </a>
      <a
        href="/dashboard/promote-gpts"
        target="_self"
        className="inline-block text-sm text-primary mx-2 mt-4"
      >
        Promote your GPTs 👉
      </a>
    </div>
  );
};
