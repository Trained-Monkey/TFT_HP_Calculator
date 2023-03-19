import { ModifierBase } from "./modifier-base";

// Handle setting of the radio type
export class CheckboxModifier extends ModifierBase<string>{
  override controlType = "checkbox";
}
