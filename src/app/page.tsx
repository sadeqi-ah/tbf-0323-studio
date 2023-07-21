import Colors from "@/components/colors";
import Canvas from "@/components/canvas";
import { colors } from "@/config";
import { SelectedColorProvider } from "@/context/selected-color";
import TShirtSide from "@/components/tshirt-side";
import { TShirtSideProvider } from "@/context/tshirt-side";

export default function Home() {
  return (
    <SelectedColorProvider>
      <TShirtSideProvider>
        <Canvas />
        <TShirtSide />
      </TShirtSideProvider>
      <Colors colors={colors} />
    </SelectedColorProvider>
  );
}
