export function ElectricFlow() {
  return (
    <div className="electric-flow" aria-hidden="true">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none">
        <path className="electric-flow-track" d="M0 60H260L300 20H540L580 98H840L880 42H1160L1200 76H1600" />
        <path className="electric-flow-pulse" d="M0 60H260L300 20H540L580 98H840L880 42H1160L1200 76H1600" />
      </svg>
      <span className="electric-flow-node electric-flow-node-one" />
      <span className="electric-flow-node electric-flow-node-two" />
    </div>
  );
}
