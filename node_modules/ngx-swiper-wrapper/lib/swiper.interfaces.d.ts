import { InjectionToken } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperEvents } from 'swiper/types/swiper-events';
export declare const SWIPER_CONFIG: InjectionToken<SwiperOptions>;
export declare type SwiperEvent = keyof SwiperEvents | 'scroll' | 'keyPress' | 'beforeResize' | 'swiperTap' | 'swiperClick' | 'swiperDoubleTap' | 'swiperTouchEnd' | 'swiperTouchMove' | 'swiperTouchStart' | 'swiperTouchMoveOpposite' | 'swiperTransitionEnd' | 'swiperTransitionStart';
export declare const SwiperEventNames: SwiperEvent[];
export interface SwiperA11YInterface {
    enabled?: boolean;
    prevSlideMessage?: string;
    nextSlideMessage?: string;
    firstSlideMessage?: string;
    lastSlideMessage?: string;
    paginationBulletMessage?: string;
    notificationClass?: string;
}
export interface SwiperLazyInterface {
    loadPrevNext?: boolean;
    loadPrevNextAmount?: number;
    loadOnTransitionStart?: boolean;
    elementClass?: string;
    loadingClass?: string;
    loadedClass?: string;
    preloaderClass?: string;
}
export interface SwiperZoomInterface {
    maxRatio?: number;
    minRatio?: number;
    toggle?: boolean;
    containerClass?: string;
    zoomedSlideClass?: string;
}
export interface SwiperThumbsInterface {
    swiper?: any;
    slideThumbActiveClass?: string;
    thumbsContainerClass?: string;
    multipleActiveThumbs?: boolean;
}
export interface SwiperHistoryInterface {
    replaceState?: boolean;
    key?: string;
}
export interface SwiperVirtualInterface {
    slides?: any[];
    cache?: boolean;
    renderSlide?: SwiperRenderSlideFunction;
    renderExternal?: SwiperRenderExternalFunction;
    addSlidesBefore?: number;
    addSlidesAfter?: number;
}
export interface SwiperKeyboardInterface {
    enabled?: boolean;
    onlyInViewport?: boolean;
}
export interface SwiperAutoplayInterface {
    delay?: number;
    stopOnLastSlide?: boolean;
    disableOnInteraction?: boolean;
    reverseDirection?: boolean;
    waitForTransition?: boolean;
}
export interface SwiperScrollbarInterface {
    el?: string | HTMLElement;
    hide?: boolean;
    draggable?: boolean;
    snapOnRelease?: boolean;
    dragSize?: number | 'auto';
    loclClass?: string;
    dragClass?: string;
}
export interface SwiperControllerInterface {
    control?: any;
    inverse?: boolean;
    by?: 'slide' | 'container';
}
export interface SwiperNavigationInterface {
    nextEl?: string | HTMLElement;
    prevEl?: string | HTMLElement;
    hideOnClick?: boolean;
    disabledClass?: string;
    hiddenClass?: string;
}
export interface SwiperPaginationInterface {
    el?: string | HTMLElement;
    type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';
    bulletElement?: string;
    dynamicBullets?: boolean;
    dynamicMainBullets?: number;
    hideOnClick?: boolean;
    clickable?: boolean;
    progressbarOpposite?: boolean;
    formatFractionCurrent?: SwiperFormatFractionFunction;
    formatFractionTotal?: SwiperFormatFractionFunction;
    renderBullet?: SwiperRenderBulletFunction;
    renderFraction?: SwiperRenderFractionFunction;
    renderProgressbar?: SwiperRenderProgressbarFunction;
    renderCustom?: SwiperRenderCustomFunction;
    bulletClass?: string;
    bulletActiveClass?: string;
    modifierClass?: string;
    currentClass?: string;
    totalClass?: string;
    hiddenClass?: string;
    progressbarFillClass?: string;
    clickableClass?: string;
    lockClass?: string;
}
export interface SwiperMousewheelInterface {
    forceToAxis?: boolean;
    releaseOnEdges?: boolean;
    invert?: boolean;
    sensitivity?: number;
    eventsTarget?: string | HTMLElement;
}
export interface SwiperHashNavigationInterface {
    watchState?: boolean;
    replaceState?: boolean;
}
export interface SwiperFadeEffectInterface {
    crossFade?: boolean;
}
export interface SwiperFlipEffectInterface {
    slideShadows?: boolean;
    limitRotation?: boolean;
}
export interface SwiperCubeEffectInterface {
    slideShadows?: boolean;
    shadow?: boolean;
    shadowOffset?: number;
    shadowScale?: number;
}
export interface SwiperCoverflowEffectInterface {
    slideShadows?: boolean;
    rotate?: number;
    stretch?: number;
    depth?: number;
    modifier?: number;
}
export interface SwiperBreakpointsInterface {
    [size: number]: SwiperOptions;
}
export declare class SwiperConfig implements SwiperOptions {
    on?: any;
    init?: boolean;
    updateOnWindowResize?: boolean;
    initialSlide?: number;
    direction?: 'horizontal' | 'vertical';
    speed?: number;
    setWrapperSize?: boolean;
    virtualTranslate?: boolean;
    width?: number;
    height?: number;
    autoHeight?: boolean;
    roundLengths?: boolean;
    nested?: boolean;
    uniqueNavElements?: boolean;
    effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
    runCallbacksOnInit?: boolean;
    watchOverflow?: boolean;
    cssMode?: boolean;
    spaceBetween?: number;
    slidesPerView?: number | 'auto';
    slidesPerColumn?: number;
    slidesPerColumnFill?: 'row' | 'column';
    slidesPerGroup?: number;
    centeredSlides?: boolean;
    centeredSlidesBounds?: boolean;
    slidesOffsetBefore?: number;
    slidesOffsetAfter?: number;
    normalizeSlideIndex?: boolean;
    centerInsufficientSlides?: boolean;
    grabCursor?: boolean;
    touchEventsTarget?: 'container' | 'wrapper';
    touchRatio?: number;
    touchAngle?: number;
    simulateTouch?: boolean;
    shortSwipes?: boolean;
    longSwipes?: boolean;
    longSwipesRatio?: number;
    longSwipesMs?: number;
    followFinger?: boolean;
    allowTouchMove?: boolean;
    threshold?: number;
    touchStartPreventDefault?: boolean;
    touchStartForcePreventDefault?: boolean;
    touchMoveStopPropagation?: boolean;
    iOSEdgeSwipeDetection?: boolean;
    iOSEdgeSwipeThreshold?: number;
    touchReleaseOnEdges?: boolean;
    passiveListeners?: boolean;
    resistance?: boolean;
    resistanceRatio?: number;
    preventInteractionOnTransition?: boolean;
    allowSlidePrev?: boolean;
    allowSlideNext?: boolean;
    noSwiping?: boolean;
    noSwipingClass?: string;
    noSwipingSelector?: string;
    swipeHandler?: string | HTMLElement;
    preventClicks?: boolean;
    preventClicksPropagation?: boolean;
    slideToClickedSlide?: boolean;
    freeMode?: boolean;
    freeModeMomentum?: boolean;
    freeModeMomentumRatio?: number;
    freeModeMomentumVelocityRatio?: number;
    freeModeMomentumBounce?: boolean;
    freeModeMomentumBounceRatio?: number;
    freeModeMinimumVelocity?: number;
    freeModeSticky?: boolean;
    watchSlidesProgress?: boolean;
    watchSlidesVisibility?: boolean;
    preloadImages?: boolean;
    updateOnImagesReady?: boolean;
    loop?: boolean;
    loopAdditionalSlides?: number;
    loopedSlides?: number;
    loopFillGroupWithBlank?: boolean;
    breakpoints?: any;
    observer?: boolean;
    observeParents?: boolean;
    observeSlideChildren?: boolean;
    containerModifierClass?: string;
    slideClass?: string;
    slideActiveClass?: string;
    slideDuplicatedActiveClass?: string;
    slideVisibleClass?: string;
    slideDuplicateClass?: string;
    slideNextClass?: string;
    slideDuplicatedNextClass?: string;
    slidePrevClass?: string;
    slideDuplicatedPrevClass?: string;
    wrapperClass?: string;
    fadeEffect?: any;
    flipEffect?: any;
    cubeEffect?: any;
    coverflowEffect?: any;
    parallax?: boolean;
    a11y?: boolean | any;
    lazy?: boolean | any;
    zoom?: boolean | any;
    history?: boolean | any;
    virtual?: boolean | any;
    autoplay?: boolean | any;
    keyboard?: boolean | any;
    scrollbar?: boolean | any;
    mousewheel?: boolean | any;
    controller?: boolean | any;
    navigation?: boolean | any;
    pagination?: boolean | any;
    hashNavigation?: boolean | any;
    constructor(config?: SwiperOptions);
    assign(config?: SwiperOptions | any, target?: any): void;
}
export declare type SwiperFormatFractionFunction = (fraction: number) => number;
export declare type SwiperRenderSlideFunction = (slide: any, index: number) => HTMLElement;
export declare type SwiperRenderExternalFunction = (data: any) => void;
export declare type SwiperRenderCustomFunction = (swiper: any, current: number, total: number) => string;
export declare type SwiperRenderBulletFunction = (index: number, className: string) => string;
export declare type SwiperRenderFractionFunction = (currentClass: string, totalClass: string) => string;
export declare type SwiperRenderProgressbarFunction = (progressbarClass: string) => string;
