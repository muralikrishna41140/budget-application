
import VoiceAssistant from "./VoiceAssistant";

const DashboardHeader = ({ userName }: { userName: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome back, {userName}! 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your finances today.
        </p>
      </div>
      <VoiceAssistant />
    </div>
  );
};

export default DashboardHeader;
