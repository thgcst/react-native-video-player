import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';

import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';

import {
  Container,
  NotLoadedBar,
  LoadedBar,
  PlayedBar,
  ThumbWrapper,
  Thumb,
  CurrentTime,
} from './styles';

interface ISlider {
  value: number;
  maxValue: number;
  loadedValue: number;
  onChangeValue?: (value: number) => void;
  onSeeking?: (value: boolean) => void;
}

export interface SliderRef {
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
}

const Slider: React.ForwardRefRenderFunction<SliderRef, ISlider> = (
  { value, maxValue, loadedValue, onChangeValue, onSeeking },
  ref,
) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const seekingPosition = useSharedValue(value / maxValue || 0);
  const isSeekingAnimation = useSharedValue(0);
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
    onSeeking?.(true);
    setIsSeeking(true);
  }

  function finishSeeking() {
    onSeeking?.(false);
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
    onEnd: () => {
      runOnJS(finishSeeking)();
    },
  });

  const thumbWrapperStyle = useAnimatedStyle(() => {
    return {
      left: `${actualPosition.value * 100}%`,
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(isSeekingAnimation.value, [0, 1], [1, 0.5]),
      width: interpolate(isSeekingAnimation.value, [0, 1], [10, 20]),
      height: interpolate(isSeekingAnimation.value, [0, 1], [10, 20]),
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

  useEffect(() => {
    isSeekingAnimation.value = withSpring(Number(isSeeking), {
      mass: 0.5,
      damping: 20,
    });
  }, [isSeeking]);

  return (
    <>
      <CurrentTime text={formatTime} />
      <Container collapsable={false}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <ThumbWrapper style={thumbWrapperStyle}>
            <Thumb style={thumbStyle} />
          </ThumbWrapper>
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
