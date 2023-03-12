import { ModifierBase } from "./modifier-base";

// Handle setting of the radio type
export class UnitSelectorModifier extends ModifierBase<string>{
  override controlType = "unitSelector";
}
