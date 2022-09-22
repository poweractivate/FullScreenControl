/* by poweractivate for the purpose of emulating F11 native browser functionality

/*


	THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER  
	EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF  
	MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE. 
 */

import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class FullScreenControl implements ComponentFramework.StandardControl<IInputs, IOutputs>
{


	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;


	private _previous_toggle_value : boolean  = false;

	private _previous_enabled_value : boolean = false;

	private context: ComponentFramework.Context<IInputs>;

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this._container = container;
		//let buttonText = context.parameters.buttonTextProperty.raw;
        //this._previous_value =  buttonText;
		

		//this.context.mode.trackContainerResize(true);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		

		let buttonEnabled = context.parameters.buttonEnabledProperty.raw;		

		if(buttonEnabled)
		{
			let buttonToggle = context.parameters.buttonToggleProperty.raw;
			if(!this._previous_enabled_value)
			{
				this._previous_enabled_value = buttonEnabled;
				this._previous_toggle_value = buttonToggle;
			}
			else
			{
				
				if(buttonToggle != this._previous_toggle_value)
				{
					this._previous_toggle_value =  buttonToggle;
					this.toggleFullscreen();

				}
		    }
			
		}
		else
		{
			this._previous_enabled_value = buttonEnabled;
		}
	


	}

	private toggleFullscreen(): void {

		let doc= document;
		let docElem = doc.documentElement;
  
		if(screen.width === window.innerWidth && screen.height === window.innerHeight ){			
			doc.exitFullscreen();
		}
		else
		{
			docElem.requestFullscreen();
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
	 */
	public getOutputs(): IOutputs {
		// no-op: method not leveraged by this example custom control
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// no-op: method not leveraged by this example custom control
	}
}