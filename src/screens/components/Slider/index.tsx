import React, { useState, forwardRef, useImperativeHandle } from 'react';

import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import {
  Container,
  NotLoadedBar,
  LoadedBar,
  PlayedBar,
  Thumb,
  CurrentTime,
} from './styles';

interface ISlider {
  value: number;
  maxValue: number;
  loadedValue: number;
  onChangeValue?: (value: number) => void;
}

export interface SliderRef {
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
}

const Slider: React.ForwardRefRenderFunction<SliderRef, ISlider> = (
  { value, maxValue, loadedValue, onChangeValue },
  ref,
) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const seekingPosition = useSharedValue(0);
  const currentPosition = useDerivedValue(() => {
    return value / maxValue || 0;
  }, [value]);
  const actualPosition = useDerivedValue(() => {
    return isSeeking ? seekingPosition.value : currentPosition.value;
  }, [isSeeking]);
  const loadedWidth = useDerivedValue(() => {
    return withSpring(loadedValue / maxValue);
  }, [loadedValue]);

  const formatTime = useDerivedValue(() => {
    const time = actualPosition.value * maxValue;

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);

    if (hours === 0) {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
  });

  function startSeeking() {
    setIsSeeking(true);
  }

  function finishSeeking() {
    onChangeValue?.(seekingPosition.value * maxValue);
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      runOnJS(startSeeking)();

      ctx.startX = seekingPosition.value;
    },
    onActive: (event, ctx) => {
      seekingPosition.value = Math.min(
        1,
        Math.max(0, ctx.startX + event.translationX / wrapperWidth),
      );
    },
    onEnd: _ => {
      runOnJS(finishSeeking)();
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      left: `${actualPosition.value * 100}%`,
    };
  });

  const playedBarStyle = useAnimatedStyle(() => {
    return {
      width: `${actualPosition.value * 100}%`,
    };
  });

  const loadedBarStyle = useAnimatedStyle(() => {
    return {
      width: `${loadedWidth.value * 100}%`,
    };
  });

  useImperativeHandle(ref, () => ({
    setIsSeeking,
  }));

  return (
    <>
      <CurrentTime text={formatTime} />
      <Container collapsable={false}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Thumb
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            style={thumbStyle}
          />
        </PanGestureHandler>
        <NotLoadedBar
          onLayout={e => setWrapperWidth(e.nativeEvent.layout.width)}>
          <LoadedBar style={loadedBarStyle} />
          <PlayedBar style={playedBarStyle} />
        </NotLoadedBar>
      </Container>
    </>
  );
};

export default forwardRef(Slider);
