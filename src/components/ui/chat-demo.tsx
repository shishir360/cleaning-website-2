import Chat from "./basic-chat";

export default function DemoOne() {
  return (
    <div className="flex items-center justify-center p-12 bg-paper min-h-[800px]">
      <Chat
        userName="Concierge Client"
        userAvatar=""
        userOnline={true}
      />
    </div>
  );
}
