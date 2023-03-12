import { ModifierBase } from "./modifier-base";

// Handle setting of the radio type
export class TextboxModifier extends ModifierBase<string>{
  override controlType = "textbox";
}
