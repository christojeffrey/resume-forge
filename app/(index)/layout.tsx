import NavBar from "../_components/navbar";
import { Separator } from "@/components/ui/separator";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBar />
        <Separator />
        {/* fill */}
        {/* whenever you want to fill with overflow only in that area, always flex-1 follow with overflow-auto */}
        {/* whenever you want a flex, always specify the height. like h-full */}
        <div className="flex-1 overflow-auto">
          {/* <div className="w-3/4 mx-auto flex h-full">
                <div className="w-1/2">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto">
                      <div className="bg-blue-50 h-[20vh]">long page</div>
                    </div>
                    <div>button</div>
                  </div>
                </div>
              </div> */}
          {children}
        </div>
      </div>
    </>
  );
}
