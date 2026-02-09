import Button from "react-bootstrap/Button";

export default function BSButton({
  children,
  border = "primary",
  text = "light",
  classes,
  variant = "primary",
  size = "md",
  ...props
}) {
  const sizeStyles = {
    sm: { padding: "3px 6px" },
    md: { padding: "6px 12px" },
    lg: { padding: "10px 20px" },
  };

  return (
    <Button
      variant={variant}
      className={`border border-${border} border-2 text-uppercase text-${text} fw-bold rounded-1 ${classes}`}
      style={sizeStyles[size]}
      {...props}>
      {children}
    </Button>
  );
}

