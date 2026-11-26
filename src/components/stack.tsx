import { StackIcon } from "./icons";
import { stackRows } from "@/lib/site";

export function StackMarquee() {
  let noteIndex = 0;

  return (
    <div className="marquee-track -mx-6 flex flex-col gap-2 overflow-hidden marquee-fade">
      {stackRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="marquee-row flex w-max"
          data-direction={rowIndex === 1 ? "reverse" : undefined}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex flex-none gap-2 pr-2"
            >
              {row.map((item) => {
                const note = noteIndex % 10;
                noteIndex += 1;
                return (
                  <li
                    key={`${copy}-${item.name}`}
                    data-sfx-note={copy === 0 ? note : undefined}
                    className="group flex h-7 w-fit flex-none items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 transition-colors hover:border-brand/50"
                  >
                    {item.icon ? (
                      <span className="flex size-3.5 flex-none items-center justify-center overflow-hidden">
                        <StackIcon
                          slug={item.icon}
                          name={item.name}
                          invertOnDark={item.invertOnDark}
                          className="size-3.5"
                        />
                      </span>
                    ) : null}
                    <span className="whitespace-nowrap text-[11px] text-muted-foreground transition-colors group-hover:text-brand">
                      {item.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
