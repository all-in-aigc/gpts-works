export default () => {
  return (
    <div className="flex flex-row md:flex-row items-center justify-center mx-auto text-center">
      <a
        href="/dashboard/submit-gpts"
        target="_self"
        className="inline-block text-sm text-primary mx-2 mt-4"
      >
        <h3>Submit your GPTs 👉</h3>
      </a>
      <a className="inline-block text-sm text-slate-300 mx-2 mt-4">|</a>
      <a
        href="/dashboard/promote-gpts"
        target="_self"
        className="inline-block text-sm text-primary mx-2 mt-4"
      >
        <h3>Promote your GPTs 👉</h3>
      </a>
    </div>
  );
};
