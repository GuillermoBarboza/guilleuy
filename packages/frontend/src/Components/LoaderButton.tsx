export default function LoaderButton({
  className = "",
  disabled = false,
  isLoading = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && '...'}
      {props.children}
    </button>
  );
}