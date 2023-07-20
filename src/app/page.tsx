import Colors from "@/components/colors";
import Canvas from "@/components/canvas";
import { colors } from "@/config";
import { SelectedColorProvider } from "@/context/selected-color";

export default function Home() {
  return (
    <SelectedColorProvider>
      <Canvas />
      <Colors colors={colors} />
    </SelectedColorProvider>
  );
}
