/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@arco-design/web-react";

function Btn({
  children,
  loading,
  type,
  styles,
  size,
  disabled,
  clicking,
  className,
}) {
  return (
    <Button
      className={className}
      onClick={clicking}
      disabled={disabled}
      style={{
        color: "#fff",
        padding: "11px",
        borderRadius: "5px",
        background: "#00A85A",
        fontSize: "16px",
        cursor: "pointer",
        ...styles,
      }}
      type={type}
      loading={loading}
      size={90}
    >
      {children}
    </Button>
  );
}

export default Btn;
