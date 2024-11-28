import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { randomString } from "../../utils/helpers";

export default function LinkTooltip({
  children,
  placement = "top" | "right" | "bottom" | "left",
  title,
  to,
  href,
  className,
}) {
  const id = `tooltip-${randomString(4, "aA#")}`;

  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip id={id}>
          {title}
        </Tooltip>
      }
    >
      <Link to={to} href={href} className={className}>
        {children}
      </Link>
    </OverlayTrigger>
  );
}
