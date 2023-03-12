import { ModifierBase } from "./modifier-base";

// Handle setting of the radio type
export class RadioModifier extends ModifierBase<string>{
  override controlType = "radio";
}
