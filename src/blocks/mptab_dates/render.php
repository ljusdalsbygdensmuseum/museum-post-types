<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$data;

if (get_post_type() == 'mptab_exhibition') {
    $start = get_post_meta(get_the_ID(), 'mptab-exhibition-date-start');
    $end = get_post_meta(get_the_ID(), 'mptab-exhibition-date-end');
    $aliasStart = get_post_meta(get_the_ID(), 'mptab-exhibition-date-start-alias');
    $aliasEnd = get_post_meta(get_the_ID(), 'mptab-exhibition-date-end-alias');

    $data = 'data-dates="[{date:"' . json_encode($start) . '"}, {date:"' . json_encode($end) . '"}]" data-alias="[' . $aliasStart . ', ' . $aliasEnd . ']"';
} elseif ((get_post_type() == 'mptab_event')) {
    $dates = get_post_meta(get_the_ID(), 'mptab-event-date-start');
    $alias = get_post_meta(get_the_ID(), 'mptab-event-date-alias');

    $data = 'data-dates="' . json_encode($dates) . '" data-alias="' . json_encode($alias) . '"';
}
?>
<div <?php echo get_block_wrapper_attributes(); ?> data-post-type="<?php echo get_post_type(); ?>" <?php echo $data; ?>>
</div>