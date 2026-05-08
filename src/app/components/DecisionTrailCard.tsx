export type DecisionTrailItem = {
  title: string;
  body: string;
  accent: string;
};

export function DecisionTrailCard({
  decision,
  dense = false,
}: {
  decision: DecisionTrailItem;
  /** Narrower card + slightly smaller type for the About strip. */
  dense?: boolean;
}) {
  const cardStyle = dense
    ? {
        width: "296px",
        minWidth: "296px",
        padding: "18px 18px 20px 18px",
      }
    : {
        width: "320px",
        minWidth: "320px",
        padding: "20px 20px 22px 20px",
      };

  const titleStyle = dense
    ? {
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: "14px",
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
        marginBottom: "12px",
        color: "#569AD9",
      }
    : {
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: "15px",
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
        marginBottom: "12px",
        color: "#569AD9",
      };

  const bodyStyle = dense
    ? {
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: "14px",
        letterSpacing: "-0.02em",
        lineHeight: 1.35,
        color: "rgba(0,0,0,0.55)",
      }
    : {
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: "15px",
        letterSpacing: "-0.02em",
        lineHeight: 1.35,
        color: "rgba(0,0,0,0.55)",
      };

  return (
    <article
      className="flex shrink-0 flex-col bg-white"
      style={cardStyle}
    >
      <h4 className="font-medium" style={titleStyle}>
        {decision.title}
      </h4>
      <p
        className="min-w-0 break-words"
        style={{
          ...bodyStyle,
          overflowWrap: "break-word",
        }}
      >
        {decision.body}
      </p>
    </article>
  );
}
