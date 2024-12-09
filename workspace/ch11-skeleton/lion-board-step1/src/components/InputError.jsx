export default function InputError({ target }) {
  if (!target) return;
  return (
    <p className="ml-2 mt-1 text-sm text-yellow-500 dark:text-yellow-400">
      {target.message}
    </p>
  );
}
