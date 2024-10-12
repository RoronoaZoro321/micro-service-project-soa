<template>
    <section
        class="z-50 fixed inset-0 h-screen w-full bg-gray-800 bg-opacity-80 overflow-hidden"
    >
        <div
            class="absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 md:p-8 h-full"
        >
            <div class="bg-white w-full max-w-2xl rounded-xl mx-auto">
                <div class="py-8">
                    <div class="container px-4 mx-auto">
                        <div class="flex justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                viewbox="0 0 64 64"
                                fill="none"
                            >
                                <circle
                                    opacity="0.3"
                                    cx="32"
                                    cy="32"
                                    r="32"
                                    fill="#EB255E"
                                ></circle>
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="24"
                                    fill="#EB255E"
                                ></circle>
                                <path
                                    d="M41.28 24.4655C41.0779 24.2969 40.8447 24.1695 40.5933 24.0911C40.3419 24.0127 40.0775 23.9842 39.8154 24.0083C39.5534 24.0321 39.2983 24.1072 39.0654 24.2299C38.8321 24.3522 38.6257 24.5194 38.4575 24.7218L29.8487 35.0499L25.3927 30.5939C25.015 30.2292 24.5093 30.0271 23.9844 30.0318C23.4596 30.0365 22.9576 30.247 22.5862 30.6183C22.2152 30.9893 22.0044 31.4914 22.0001 32.0165C21.9954 32.5414 22.1971 33.0471 22.5618 33.4244L28.5675 39.4301C28.7538 39.6165 28.975 39.7642 29.2186 39.8651C29.4623 39.9657 29.7234 40.0173 29.9868 40.0166H30.0769C30.3551 40.0042 30.6279 39.9342 30.8776 39.8102C31.1269 39.6865 31.3481 39.5119 31.5264 39.2981L41.5353 27.2867C41.7039 27.0846 41.8309 26.8514 41.9093 26.6003C41.9877 26.3493 42.0156 26.0852 41.9918 25.8231C41.968 25.5611 41.8929 25.3067 41.7706 25.0738C41.6482 24.8409 41.4813 24.6344 41.2793 24.4658L41.28 24.4655Z"
                                    fill="#990000"
                                ></path>
                            </svg>
                        </div>
                        <p
                            class="text-center my-4 px-8 font-semibold lg:text-lg max-w-md mx-auto"
                        >
                            Code is invalid!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.vf-create-account *,
.vf-create-account *:before,
.vf-create-account *:after,
.vf-create-account:root {
    --vf-primary: #4f81c7;
    --vf-primary-darker: #06ac8b;
    --vf-color-on-primary: #ffffff;
    --vf-danger: #ef4444;
    --vf-danger-lighter: #fee2e2;
    --vf-success: #10b981;
    --vf-success-lighter: #d1fae5;
    --vf-gray-50: #f9fafb;
    --vf-gray-100: #f3f4f6;
    --vf-gray-200: #ffdbd6;
    --vf-gray-300: #d1d5db;
    --vf-gray-400: #9ca3af;
    --vf-gray-500: #6b7280;
    --vf-gray-600: #4b5563;
    --vf-gray-700: #374151;
    --vf-gray-800: #1f2937;
    --vf-gray-900: #111827;
    --vf-dark-50: #efefef;
    --vf-dark-100: #dcdcdc;
    --vf-dark-200: #bdbdbd;
    --vf-dark-300: #a0a0a0;
    --vf-dark-400: #848484;
    --vf-dark-500: #737373;
    --vf-dark-600: #393939;
    --vf-dark-700: #323232;
    --vf-dark-800: #262626;
    --vf-dark-900: #191919;
    --vf-ring-width: 2px;
    --vf-ring-color: #07bf9b66;
    --vf-link-color: var(--vf-primary);
    --vf-link-decoration: inherit;
    --vf-font-size: 1rem;
    --vf-font-size-sm: 0.875rem;
    --vf-font-size-lg: 1rem;
    --vf-font-size-small: 0.875rem;
    --vf-font-size-small-sm: 0.8125rem;
    --vf-font-size-small-lg: 0.875rem;
    --vf-font-size-h1: 2.125rem;
    --vf-font-size-h1-sm: 2.125rem;
    --vf-font-size-h1-lg: 2.125rem;
    --vf-font-size-h2: 1.875rem;
    --vf-font-size-h2-sm: 1.875rem;
    --vf-font-size-h2-lg: 1.875rem;
    --vf-font-size-h3: 1.5rem;
    --vf-font-size-h3-sm: 1.5rem;
    --vf-font-size-h3-lg: 1.5rem;
    --vf-font-size-h4: 1.25rem;
    --vf-font-size-h4-sm: 1.25rem;
    --vf-font-size-h4-lg: 1.25rem;
    --vf-font-size-h1-mobile: 1.5rem;
    --vf-font-size-h1-mobile-sm: 1.5rem;
    --vf-font-size-h1-mobile-lg: 1.5rem;
    --vf-font-size-h2-mobile: 1.25rem;
    --vf-font-size-h2-mobile-sm: 1.25rem;
    --vf-font-size-h2-mobile-lg: 1.25rem;
    --vf-font-size-h3-mobile: 1.125rem;
    --vf-font-size-h3-mobile-sm: 1.125rem;
    --vf-font-size-h3-mobile-lg: 1.125rem;
    --vf-font-size-h4-mobile: 1rem;
    --vf-font-size-h4-mobile-sm: 1rem;
    --vf-font-size-h4-mobile-lg: 1rem;
    --vf-font-size-blockquote: 1rem;
    --vf-font-size-blockquote-sm: 0.875rem;
    --vf-font-size-blockquote-lg: 1rem;
    --vf-line-height: 1.5rem;
    --vf-line-height-sm: 1.25rem;
    --vf-line-height-lg: 1.5rem;
    --vf-line-height-small: 1.25rem;
    --vf-line-height-small-sm: 1.125rem;
    --vf-line-height-small-lg: 1.25rem;
    --vf-line-height-headings: 1.2;
    --vf-line-height-headings-sm: 1.2;
    --vf-line-height-headings-lg: 1.2;
    --vf-line-height-blockquote: 1.5rem;
    --vf-line-height-blockquote-sm: 1.25rem;
    --vf-line-height-blockquote-lg: 1.5rem;
    --vf-letter-spacing: 0px;
    --vf-letter-spacing-sm: 0px;
    --vf-letter-spacing-lg: 0px;
    --vf-letter-spacing-small: 0px;
    --vf-letter-spacing-small-sm: 0px;
    --vf-letter-spacing-small-lg: 0px;
    --vf-letter-spacing-headings: 0px;
    --vf-letter-spacing-headings-sm: 0px;
    --vf-letter-spacing-headings-lg: 0px;
    --vf-letter-spacing-blockquote: 0px;
    --vf-letter-spacing-blockquote-sm: 0px;
    --vf-letter-spacing-blockquote-lg: 0px;
    --vf-gutter: 1rem;
    --vf-gutter-sm: 0.5rem;
    --vf-gutter-lg: 1rem;
    --vf-min-height-input: 2.375rem;
    --vf-min-height-input-sm: 2.125rem;
    --vf-min-height-input-lg: 2.875rem;
    --vf-py-input: 0.375rem;
    --vf-py-input-sm: 0.375rem;
    --vf-py-input-lg: 0.625rem;
    --vf-px-input: 0.75rem;
    --vf-px-input-sm: 0.5rem;
    --vf-px-input-lg: 0.875rem;
    --vf-py-btn: 0.375rem;
    --vf-py-btn-sm: 0.375rem;
    --vf-py-btn-lg: 0.625rem;
    --vf-px-btn: 0.875rem;
    --vf-px-btn-sm: 0.75rem;
    --vf-px-btn-lg: 1.25rem;
    --vf-py-btn-small: 0.25rem;
    --vf-py-btn-small-sm: 0.25rem;
    --vf-py-btn-small-lg: 0.375rem;
    --vf-px-btn-small: 0.625rem;
    --vf-px-btn-small-sm: 0.625rem;
    --vf-px-btn-small-lg: 0.75rem;
    --vf-py-group-tabs: 0.375rem;
    --vf-py-group-tabs-sm: 0.375rem;
    --vf-py-group-tabs-lg: 0.625rem;
    --vf-px-group-tabs: 0.75rem;
    --vf-px-group-tabs-sm: 0.5rem;
    --vf-px-group-tabs-lg: 0.875rem;
    --vf-py-group-blocks: 0.75rem;
    --vf-py-group-blocks-sm: 0.625rem;
    --vf-py-group-blocks-lg: 0.875rem;
    --vf-px-group-blocks: 1rem;
    --vf-px-group-blocks-sm: 1rem;
    --vf-px-group-blocks-lg: 1rem;
    --vf-py-tag: 0px;
    --vf-py-tag-sm: 0px;
    --vf-py-tag-lg: 0px;
    --vf-px-tag: 0.4375rem;
    --vf-px-tag-sm: 0.4375rem;
    --vf-px-tag-lg: 0.4375rem;
    --vf-py-slider-tooltip: 0.125rem;
    --vf-py-slider-tooltip-sm: 0.0625rem;
    --vf-py-slider-tooltip-lg: 0.1875rem;
    --vf-px-slider-tooltip: 0.375rem;
    --vf-px-slider-tooltip-sm: 0.3125rem;
    --vf-px-slider-tooltip-lg: 0.5rem;
    --vf-py-blockquote: 0.25rem;
    --vf-py-blockquote-sm: 0.25rem;
    --vf-py-blockquote-lg: 0.25rem;
    --vf-px-blockquote: 0.75rem;
    --vf-px-blockquote-sm: 0.75rem;
    --vf-px-blockquote-lg: 0.75rem;
    --vf-py-hr: 0.25rem;
    --vf-space-addon: 0px;
    --vf-space-addon-sm: 0px;
    --vf-space-addon-lg: 0px;
    --vf-space-checkbox: 0.375rem;
    --vf-space-checkbox-sm: 0.375rem;
    --vf-space-checkbox-lg: 0.375rem;
    --vf-space-tags: 0.1875rem;
    --vf-space-tags-sm: 0.1875rem;
    --vf-space-tags-lg: 0.1875rem;
    --vf-space-static-tag-1: 1rem;
    --vf-space-static-tag-2: 2rem;
    --vf-space-static-tag-3: 3rem;
    --vf-floating-top: 0rem;
    --vf-floating-top-sm: 0rem;
    --vf-floating-top-lg: 0.6875rem;
    --vf-bg-input: #ffffff;
    --vf-bg-input-hover: #ffffff;
    --vf-bg-input-focus: #ffffff;
    --vf-bg-input-danger: #ffffff;
    --vf-bg-input-success: #ffffff;
    --vf-bg-checkbox: #ffffff;
    --vf-bg-checkbox-hover: #ffffff;
    --vf-bg-checkbox-focus: #ffffff;
    --vf-bg-checkbox-danger: #ffffff;
    --vf-bg-checkbox-success: #ffffff;
    --vf-bg-disabled: var(--vf-gray-200);
    --vf-bg-selected: #1118270d;
    --vf-bg-passive: var(--vf-gray-300);
    --vf-bg-icon: var(--vf-gray-500);
    --vf-bg-danger: var(--vf-danger-lighter);
    --vf-bg-success: var(--vf-success-lighter);
    --vf-bg-tag: var(--vf-primary);
    --vf-bg-slider-handle: var(--vf-primary);
    --vf-bg-toggle-handle: #ffffff;
    --vf-bg-date-head: var(--vf-gray-100);
    --vf-bg-addon: #ffffff00;
    --vf-bg-btn: var(--vf-primary);
    --vf-bg-btn-danger: var(--vf-danger);
    --vf-bg-btn-secondary: var(--vf-gray-200);
    --vf-color-input: var(--vf-gray-800);
    --vf-color-input-hover: var(--vf-gray-800);
    --vf-color-input-focus: var(--vf-gray-800);
    --vf-color-input-danger: var(--vf-gray-800);
    --vf-color-input-success: var(--vf-gray-800);
    --vf-color-disabled: var(--vf-gray-400);
    --vf-color-placeholder: var(--vf-gray-300);
    --vf-color-passive: var(--vf-gray-700);
    --vf-color-muted: var(--vf-gray-500);
    --vf-color-floating: var(--vf-gray-500);
    --vf-color-floating-focus: var(--vf-gray-500);
    --vf-color-floating-success: var(--vf-gray-500);
    --vf-color-floating-danger: var(--vf-gray-500);
    --vf-color-danger: var(--vf-danger);
    --vf-color-success: var(--vf-success);
    --vf-color-tag: var(--vf-color-on-primary);
    --vf-color-addon: var(--vf-gray-800);
    --vf-color-date-head: var(--vf-gray-700);
    --vf-color-btn: var(--vf-color-on-primary);
    --vf-color-btn-danger: #ffffff;
    --vf-color-btn-secondary: var(--vf-gray-700);
    --vf-border-color-input: var(--vf-gray-300);
    --vf-border-color-input-hover: var(--vf-gray-300);
    --vf-border-color-input-focus: var(--vf-primary);
    --vf-border-color-input-danger: var(--vf-gray-300);
    --vf-border-color-input-success: var(--vf-gray-300);
    --vf-border-color-checkbox: var(--vf-gray-300);
    --vf-border-color-checkbox-focus: var(--vf-primary);
    --vf-border-color-checkbox-hover: var(--vf-gray-300);
    --vf-border-color-checkbox-danger: var(--vf-gray-300);
    --vf-border-color-checkbox-success: var(--vf-gray-300);
    --vf-border-color-checked: var(--vf-primary);
    --vf-border-color-passive: var(--vf-gray-300);
    --vf-border-color-slider-tooltip: var(--vf-primary);
    --vf-border-color-tag: var(--vf-primary);
    --vf-border-color-btn: var(--vf-primary);
    --vf-border-color-btn-danger: var(--vf-danger);
    --vf-border-color-btn-secondary: var(--vf-gray-200);
    --vf-border-color-blockquote: var(--vf-gray-300);
    --vf-border-color-hr: var(--vf-gray-300);
    --vf-border-width-input-t: 1px;
    --vf-border-width-input-r: 1px;
    --vf-border-width-input-b: 1px;
    --vf-border-width-input-l: 1px;
    --vf-border-width-radio-t: 1px;
    --vf-border-width-radio-r: 1px;
    --vf-border-width-radio-b: 1px;
    --vf-border-width-radio-l: 1px;
    --vf-border-width-checkbox-t: 1px;
    --vf-border-width-checkbox-r: 1px;
    --vf-border-width-checkbox-b: 1px;
    --vf-border-width-checkbox-l: 1px;
    --vf-border-width-dropdown: 1px;
    --vf-border-width-btn: 1px;
    --vf-border-width-toggle: 0.125rem;
    --vf-border-width-tag: 1px;
    --vf-border-width-blockquote: 3px;
    --vf-shadow-input: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-input-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-input-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-handles: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-handles-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-handles-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-btn: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-shadow-dropdown: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --vf-radius-input: 0.25rem;
    --vf-radius-input-sm: 0.25rem;
    --vf-radius-input-lg: 0.25rem;
    --vf-radius-btn: 0.25rem;
    --vf-radius-btn-sm: 0.25rem;
    --vf-radius-btn-lg: 0.25rem;
    --vf-radius-small: 0.25rem;
    --vf-radius-small-sm: 0.25rem;
    --vf-radius-small-lg: 0.25rem;
    --vf-radius-large: 0.25rem;
    --vf-radius-large-sm: 0.25rem;
    --vf-radius-large-lg: 0.25rem;
    --vf-radius-tag: 0.25rem;
    --vf-radius-tag-sm: 0.25rem;
    --vf-radius-tag-lg: 0.25rem;
    --vf-radius-checkbox: 0.25rem;
    --vf-radius-checkbox-sm: 0.25rem;
    --vf-radius-checkbox-lg: 0.25rem;
    --vf-radius-slider: 0.25rem;
    --vf-radius-slider-sm: 0.25rem;
    --vf-radius-slider-lg: 0.25rem;
    --vf-radius-image: 0.25rem;
    --vf-radius-image-sm: 0.25rem;
    --vf-radius-image-lg: 0.25rem;
    --vf-radius-gallery: 0.25rem;
    --vf-radius-gallery-sm: 0.25rem;
    --vf-radius-gallery-lg: 0.25rem;
    --vf-checkbox-size: 1rem;
    --vf-checkbox-size-sm: 0.875rem;
    --vf-checkbox-size-lg: 1rem;
    --vf-gallery-size: 6rem;
    --vf-gallery-size-sm: 5rem;
    --vf-gallery-size-lg: 7rem;
    --vf-toggle-width: 3rem;
    --vf-toggle-width-sm: 2.75rem;
    --vf-toggle-width-lg: 3rem;
    --vf-toggle-height: 1.25rem;
    --vf-toggle-height-sm: 1rem;
    --vf-toggle-height-lg: 1.25rem;
    --vf-slider-height: 0.375rem;
    --vf-slider-height-sm: 0.3125rem;
    --vf-slider-height-lg: 0.5rem;
    --vf-slider-height-vertical: 20rem;
    --vf-slider-height-vertical-sm: 20rem;
    --vf-slider-height-vertical-lg: 20rem;
    --vf-slider-handle-size: 1rem;
    --vf-slider-handle-size-sm: 0.875rem;
    --vf-slider-handle-size-lg: 1.25rem;
    --vf-slider-tooltip-distance: 0.5rem;
    --vf-slider-tooltip-distance-sm: 0.375rem;
    --vf-slider-tooltip-distance-lg: 0.5rem;
    --vf-slider-tooltip-arrow-size: 0.3125rem;
    --vf-slider-tooltip-arrow-size-sm: 0.3125rem;
    --vf-slider-tooltip-arrow-size-lg: 0.3125rem;
    --vf-border-color-signature-hr: var(--vf-gray-300);
    --vf-size: sm;
}
</style>
