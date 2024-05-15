import NavBar from "../_components/navbar";
import { Separator } from "@/src/components/ui/separator";
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
                  <div className="bg-blue-50 h-[200vh]">
                    long page
                    <div className="flex border-2 border-black overflow-auto">
                      <div className="flex-1 overflow-auto">
                        <div className="overflow-auto w-[50vw] bg-blue-50">
                          longpart
                        </div>
                      </div>
                      <div className="w-24 bg-white">right part</div>
                    </div>
                  </div>
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
