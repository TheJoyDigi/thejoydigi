import React from "react";
import { slugifyHeading } from "@/lib/slug";

/**
 * Visual explainers for blog posts, authored in .md files through MDX.
 * Author rules (see podcast/blog-seo/PROGRAM.md): double-quoted string
 * props only, no braces, no text children on the wrapper components,
 * one blank line around each block, and every number on a visual must
 * already appear in the body text.
 */

type RowProps = { label?: string; left: string; right: string };

function rowProps(children: React.ReactNode): RowProps[] {
  return React.Children.toArray(children)
    .filter((c): c is React.ReactElement => React.isValidElement(c))
    .map((c) => c.props as RowProps)
    .filter((p) => typeof p.left === "string" && typeof p.right === "string");
}

export function LedgerRow(_: RowProps) {
  return null;
}

export function Ledger({
  title,
  left,
  right,
  caption,
  children,
}: {
  title?: string;
  left: string;
  right: string;
  caption?: string;
  children?: React.ReactNode;
}) {
  const rows = rowProps(children);
  const hasLabels = rows.some((r) => r.label);
  return (
    <figure className="xp-ledger">
      {title ? <span className="xp-label">{title}</span> : null}
      <table>
        <thead>
          <tr>
            {hasLabels ? <th aria-hidden="true"></th> : null}
            <th scope="col">{left}</th>
            <th scope="col">{right}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {hasLabels ? (
                <th scope="row">{r.label || ""}</th>
              ) : null}
              <td data-label={left}>{r.left}</td>
              <td data-label={right}>{r.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Stat({
  value,
  unit,
  label,
  note,
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
}) {
  return (
    <aside className="xp-stat" aria-label="Key figure">
      <div>
        <span className="xp-stat__value">{value}</span>
        {unit ? <span className="xp-stat__unit">{unit}</span> : null}
      </div>
      <div className="xp-stat__label">{label}</div>
      {note ? <div className="xp-stat__note">{note}</div> : null}
    </aside>
  );
}

type StepProps = { title: string; text: string };

export function FlowStep(_: StepProps) {
  return null;
}

export function Flow({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const steps = React.Children.toArray(children)
    .filter((c): c is React.ReactElement => React.isValidElement(c))
    .map((c) => c.props as StepProps)
    .filter((p) => typeof p.title === "string" && typeof p.text === "string");
  return (
    <figure className="xp-flow">
      {title ? <span className="xp-label">{title}</span> : null}
      <ol>
        {steps.map((s, i) => (
          <li key={i}>
            <span className="xp-flow__n" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <div className="xp-flow__title">{s.title}</div>
              <p className="xp-flow__text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function PullQuote({ quote, by }: { quote: string; by?: string }) {
  return (
    <figure className="pq">
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      {by ? <figcaption>{by}</figcaption> : null}
    </figure>
  );
}

function flattenText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (React.isValidElement(node))
    return flattenText((node as React.ReactElement<any>).props.children);
  return "";
}

function H2({ children }: { children?: React.ReactNode }) {
  const text = flattenText(children);
  const id = slugifyHeading(text);
  return (
    <h2 id={id}>
      {children}
      <a className="anchor" href={`#${id}`} aria-label={`Link to section: ${text}`}>
        #
      </a>
    </h2>
  );
}

function Quote({ children }: { children?: React.ReactNode }) {
  return <blockquote>{children}</blockquote>;
}

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  Ledger,
  LedgerRow,
  Stat,
  Flow,
  FlowStep,
  PullQuote,
  h2: H2,
  blockquote: Quote,
};
