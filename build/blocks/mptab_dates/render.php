<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
/*$data;

if (get_post_type() == 'mptab_exhibition') {
    $start = get_post_meta(get_the_ID(), 'mptab-exhibition-date-start')[0];
    $end = get_post_meta(get_the_ID(), 'mptab-exhibition-date-end')[0];
    $aliasStart = get_post_meta(get_the_ID(), 'mptab-exhibition-date-start-alias')[0];
    $aliasEnd = get_post_meta(get_the_ID(), 'mptab-exhibition-date-end-alias')[0];

    $data = 'data-dates=[{date:' . json_encode($start) . '}, {date:"' . json_encode($end) . '"}]" data-alias="[' . $aliasStart . ', ' . $aliasEnd . ']"';
} elseif ((get_post_type() == 'mptab_event')) {
    $dates = get_post_meta(get_the_ID(), 'mptab-event-date-start');
    $alias = get_post_meta(get_the_ID(), 'mptab-event-date-alias');

    $data = 'data-dates="' . json_encode($dates) . '" data-alias="' . json_encode($alias) . '"';
}*/
?>
<div <?php echo get_block_wrapper_attributes(); ?> data-route="<?php echo rest_get_route_for_post(get_the_ID()) ?>" style="font-weight: bold; color:#F5DDA2">
</div>