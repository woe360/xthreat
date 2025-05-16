import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import useCalendarPreload from "@/app/(marketing)/navigation/cal-preloading";

export default function CalEmbed() {
  useCalendarPreload("https://cal.com/domass/demo");
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "demo" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#0b0b0b" },
          dark: { "cal-brand": "#fafafa" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="demo"
      data-cal-link="domass/demo"
      data-cal-config='{"layout":"month_view"}'
      className="p-4 h-9 w-full text-gray-400 hover:text-white sm:w-fit rounded-full border border-gray/30 hover:bg-white/5 group transition-all flex items-center justify-center gap-4"
    >
      <span className="flex md:text-center">
        Book Demo
      </span>
    </button>
  );
} 