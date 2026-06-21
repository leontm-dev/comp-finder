import { Footer } from "@/components/base-layout/footer";
import { Navbar } from "@/components/base-layout/navbar";
import { CombFinderSelectionComponent } from "./finder";

export default function FindPage() {
  return (
    <div className="relative flex max-w-screen flex-col">
      <main className="flex min-h-screen w-full flex-col items-center lg:h-screen">
        <Navbar />
        <div className="px-2 md:px-4 lg:px-6 xl:px-8">
          <CombFinderSelectionComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
