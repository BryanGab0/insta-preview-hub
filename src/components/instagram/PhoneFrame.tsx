import { ReactNode } from "react";
import { Wifi, Signal, Battery } from "lucide-react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="relative mx-auto w-[375px] rounded-[3rem] border-[8px] border-foreground/90 bg-card shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-foreground/90 rounded-b-2xl z-20" />
      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-foreground">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
      {/* Content */}
      <div className="h-[700px] overflow-y-auto scrollbar-hide">
        {children}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-2 pt-1 bg-card">
        <div className="w-[134px] h-[5px] rounded-full bg-foreground/30" />
      </div>
    </div>
  );
};

export default PhoneFrame;
