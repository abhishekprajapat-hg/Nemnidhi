// Shared between /portal/audit's result step and /portal's dashboard blueprint
// section - both need the same "group by pillar, let the client check/uncheck
// any item, show a live total" UI for a self-service (origin: "self_service")
// Blueprint that's still status "draft" (i.e. the client hasn't confirmed a
// final selection with staff yet).

import { S, formatInr } from "./portal-styles";

export type Pillar = "marketing_sales" | "operations" | "documentation_admin" | "service_support";

export type SelectableComponent = {
  code: string;
  title: string;
  pillar: Pillar;
  packageStatus: "included" | "addon";
  oneTimePrice: number;
  monthlyPrice: number;
};

export const PILLAR_ORDER: Pillar[] = ["marketing_sales", "operations", "documentation_admin", "service_support"];
export const PILLAR_LABEL: Record<Pillar, string> = {
  marketing_sales: "Marketing & Sales",
  operations: "Operations",
  documentation_admin: "Documentation & Admin",
  service_support: "Service & Support",
};

export function groupByPillar<T extends { pillar: Pillar }>(components: T[]) {
  return PILLAR_ORDER.map((pillar) => ({
    pillar,
    label: PILLAR_LABEL[pillar],
    items: components.filter((c) => c.pillar === pillar),
  })).filter((group) => group.items.length > 0);
}

export function computeSelectedTotal(components: SelectableComponent[], selectedCodes: Set<string>) {
  const selected = components.filter((c) => selectedCodes.has(c.code));
  return {
    oneTime: selected.reduce((sum, c) => sum + c.oneTimePrice, 0),
    monthly: selected.reduce((sum, c) => sum + c.monthlyPrice, 0),
  };
}

export function SelectableComponentList({
  components,
  selectedCodes,
  onToggle,
  editable,
}: {
  components: SelectableComponent[];
  selectedCodes: Set<string>;
  onToggle: (code: string) => void;
  editable: boolean;
}) {
  const groups = groupByPillar(components);

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {groups.map((group) => (
        <div key={group.pillar}>
          <p
            style={{
              color: S.accent,
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.6rem",
            }}
          >
            {group.label}
          </p>
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {group.items.map((component) => (
              <label
                key={component.code}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  borderBottom: `1px solid ${S.line}`,
                  paddingBottom: "0.6rem",
                  cursor: editable ? "pointer" : "default",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedCodes.has(component.code)}
                    disabled={!editable}
                    onChange={() => onToggle(component.code)}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <div>
                    <p style={{ color: S.white, fontWeight: 600, fontSize: "0.85rem" }}>{component.title}</p>
                    {component.packageStatus === "addon" ? (
                      <p style={{ color: S.faint, fontSize: "0.7rem", marginTop: "0.15rem" }}>Optional upgrade</p>
                    ) : null}
                  </div>
                </div>
                <p style={{ color: S.faint, fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                  {formatInr(component.oneTimePrice)}
                  {component.monthlyPrice > 0 ? ` + ${formatInr(component.monthlyPrice)}/mo` : ""}
                </p>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
