import { render, fireEvent } from "@testing-library/react";
import TemperatureSlider from "../Components/TemperatureSlider";

describe("Temperature Slider", () => {
  it("Should set the correct temperature value when slider is moved", () => {
    const setTemperature = jest.fn();
    const { getByLabelText } = render(
      <TemperatureSlider user setTemperature={setTemperature} />
    );
    const slider = getByLabelText("Creativity");

    // move the slider to a new value
    fireEvent.change(slider, { target: { value: 75 } });

    // assert that setTemperature was called with the correct value
    expect(setTemperature).toHaveBeenCalledWith(0.75);
  });
});
