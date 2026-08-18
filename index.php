<?php
/*
 * Plugin Name:       Museum post types
 * Description:       Posttypes and blocks that fit any museum
 * Version:           0.1.0
 * Author:            Ina Eklund
 * Text Domain:       mptab-domain
 * Domain Path:       /languages
*/
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}
class PluginBoilerplate
{
    public function __construct()
    {
        //on init /post types /blocks 
        add_action('init', array($this, 'on_init'));

        //meta boxes
        add_action('add_meta_boxes', array($this, 'init_meta_boxes'));

        //Save posts
        add_action('save_post_mptab_exhibition', array($this, 'save_exhibition_post'));
        add_action('save_post_mptab_event', array($this, 'save_event_post'));
        add_action('save_post_mptab_service', array($this, 'save_service_post'));

        //enqueue
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        //RestAPI
        add_action('rest_api_init', array($this, 'custom_rest'));

        //Sub page
        add_action('admin_menu', array($this, 'init_admin_menu'));

        //on admin init /settings
        add_action('admin_init', array($this, 'on_admin_init'));
    }
    function on_init()
    {
        // languages
        load_plugin_textdomain('mptab-domain', false, dirname(plugin_basename(__FILE__)) . '/languages');

        // Post types
        $exhibition_args = array(
            'labels' => array(
                'name' => __('Exhibitions', 'mptab-domain'),
                'singular_name' => __('Exhibition', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'archives' => __('Exhibition', 'mptab-domain') . ' ' . __('archive', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('exhibitions', 'mptab-domain')),
            'menu_icon' => 'dashicons-admin-site-alt',
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
        );
        register_post_type('mptab_exhibition', $exhibition_args);

        $event_args = array(
            'labels' => array(
                'name' => __('Events', 'mptab-domain'),
                'singular_name' => __('Event', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'archives' => __('Event', 'mptab-domain') . ' ' . __('archive', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('events', 'mptab-domain')),
            'menu_icon' => 'dashicons-schedule',
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
        );
        register_post_type('mptab_event', $event_args);

        $service_args = array(
            'labels' => array(
                'name' => __('Services', 'mptab-domain'),
                'singular_name' => __('Service', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'archives' => __('Service', 'mptab-domain') . ' ' . __('archive', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('services', 'mptab-domain')),
            'menu_icon' => 'dashicons-hammer',
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
        );
        register_post_type('mptab_service', $service_args);

        //blocks
        register_block_type(__DIR__ . '/build/blocks/mptab_show_ex_ev');
        register_block_type(__DIR__ . '/build/blocks/mptab_show_services');
        register_block_type(__DIR__ . '/build/blocks/mptab_phone');
        register_block_type(__DIR__ . '/build/blocks/mptab_map');
        register_block_type(__DIR__ . '/build/blocks/mptab_adress');
        register_block_type(__DIR__ . '/build/blocks/mptab_dates');
    }

    //Metaboxes

    function init_meta_boxes()
    {
        add_meta_box('mptab-exhibition-prio', __('Priority', 'mptab-domain'), array($this, 'metabox_exhibition_prio'), 'mptab_exhibition', 'side', 'default');
        add_meta_box('mptab-exhibition-date', __('Dates', 'mptab-domain'), array($this, 'metabox_exhibition_date'), 'mptab_exhibition', 'side', 'default');

        add_meta_box('mptab-event-prio', __('Priority', 'mptab-domain'), array($this, 'metabox_event_prio'), 'mptab_event', 'side', 'default');
        add_meta_box('mptab-event-hour', __('Hours', 'mptab-domain'), array($this, 'metabox_event_hour'), 'mptab_event', 'side', 'default');
        add_meta_box('mptab-event-date', __('Dates', 'mptab-domain'), array($this, 'metabox_event_date'), 'mptab_event', 'side', 'default');
    }
    function metabox_exhibition_prio($post)
    {
        wp_nonce_field('save_exhibition_post', 'mptab-exhibition_prio_nonce');

        $prio = get_post_meta($post->ID, 'mptab-exhib-ev_prio', true);
?>
        <div class="exhibition_prio_meta">
            <select name="mptab-exhibition_prio_field" id="mptab-exhibition_prio_field">
                <option value="-10">-- <?php _e('Pick an option', 'mptab-domain') ?> --</option>
                <option value="-1" <?php if ($prio == -1) echo 'selected' ?>><?php _e('Low', 'mptab-domain') ?></option>
                <option value="0" <?php if ($prio == 0) echo 'selected' ?>><?php _e('Medium', 'mptab-domain') ?></option>
                <option value="1" <?php if ($prio == 1) echo 'selected' ?>><?php _e('High', 'mptab-domain') ?></option>
            </select>
        </div>
    <?php
    }
    function metabox_exhibition_date($post)
    {
        wp_nonce_field('save_exhibition_post', 'mptab-exhibition_date_nonce');

        $startDate = get_post_meta($post->ID, 'mptab-exhibition_date_start', true);
        $endDate = get_post_meta($post->ID, 'mptab-exhibition_date_end', true);
        $startAlias = get_post_meta($post->ID, 'mptab-exhibition_date_start_alias', true);
        $endAlias = get_post_meta($post->ID, 'mptab-exhibition_date_end_alias', true);
        $permanent = get_post_meta($post->ID, 'mptab-exhibition-is-permanent', true);
    ?>
        <div class="exhibition_date_meta">
            <div class="mptab-exhibition-daterange" id="mptab-exhibition-daterange"></div>
            <input type="number" name="mptab-exhibition_date_start_field" id="mptab-exhibition_date_start_field" value="<?php esc_attr_e($startDate, 'mptab-domain') ?>" style="display:none;">
            <input type=" number" name="mptab-exhibition_date_end_field" id="mptab-exhibition_date_end_field" value="<?php esc_attr_e($endDate, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-exhibition_date_start_alias_field" id="mptab-exhibition_date_start_alias_field" value="<?php esc_attr_e($startAlias, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-exhibition_date_end_alias_field" id="mptab-exhibition_date_end_alias_field" value="<?php esc_attr_e($endAlias, 'mptab-domain') ?>" style="display:none;">
            <input type="checkbox" name="mptab-exhibition-is-permanent" id="mptab-exhibition-is-permanent" <?php echo ($permanent) ? 'checked' : '' ?> style="display:none;">
        </div>
    <?php
    }
    function metabox_event_prio($post)
    {
        wp_nonce_field('save_event_post', 'mptab-event_prio_nonce');

        $prio = get_post_meta($post->ID, 'mptab-exhib-ev_prio', true);
    ?>
        <div class="event_prio_meta">
            <select name="mptab-event_prio_field" id="mptab-event_prio_field">
                <option value="-10">-- <?php _e('Pick an option', 'mptab-domain') ?> --</option>
                <option value="-1" <?php if ($prio == -1) echo 'selected' ?>><?php _e('Low', 'mptab-domain') ?></option>
                <option value="0" <?php if ($prio == 0) echo 'selected' ?>><?php _e('Medium', 'mptab-domain') ?></option>
                <option value="1" <?php if ($prio == 1) echo 'selected' ?>><?php _e('High', 'mptab-domain') ?></option>
            </select>
        </div>
    <?php
    }
    function metabox_event_hour($post)
    {
        wp_nonce_field('save_event_post', 'mptab-event_hour_nonce');

        $hour = get_post_meta($post->ID, 'mptab-event_hour', true);

    ?>
        <div class="event_date_meta">
            <div class="mptab-event-hour-select" id="mptab-event-hour-select"></div>
            <input type="text" name="mptab-event_hour_field" id="mptab-event_hour_field" value="<?php esc_attr_e($hour, 'mptab-domain') ?>" style="display:none;">
        </div>
    <?php
    }
    function metabox_event_date($post)
    {
        wp_nonce_field('save_event_post', 'mptab-event_date_nonce');

        $startDate = get_post_meta($post->ID, 'mptab-event_date_start', true);
        $endDate = get_post_meta($post->ID, 'mptab-event_date_end', true);
        $allDates = get_post_meta($post->ID, 'mptab-event_date_all', true);
        $alias = get_post_meta($post->ID, 'mptab-event_date_alias', true);

    ?>
        <div class="event_date_meta">
            <div class="mptab-event-date-select" id="mptab-event-date-select"></div>
            <input type="number" name="mptab-event_date_start_field" id="mptab-event_date_start_field" value="<?php esc_attr_e($startDate, 'mptab-domain') ?>" style="display:none;">
            <input type="number" name="mptab-event_date_end_field" id="mptab-event_date_end_field" value="<?php esc_attr_e($endDate, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-event_date_all_field" id="mptab-event_date_all_field" value="<?php esc_attr_e($allDates, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-event_date_alias_field" id="mptab-event_date_alias_field" value="<?php esc_attr_e($alias, 'mptab-domain') ?>" style="display:none;">
        </div>
    <?php
    }

    //Save posts

    function save_exhibition_post($postID)
    {
        if (! isset($_POST['mptab-exhibition_date_nonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['mptab-exhibition_date_nonce'], 'save_exhibition_post') || ! wp_verify_nonce($_POST['mptab-exhibition_prio_nonce'], 'save_exhibition_post')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['mptab-exhibition_date_start_field']) || ! isset($_POST['mptab-exhibition_date_end_field']) || ! isset($_POST['mptab-exhibition_date_start_alias_field']) || ! isset($_POST['mptab-exhibition_date_end_alias_field'])) {
            return;
        }

        $prio = (int) sanitize_text_field($_POST['mptab-exhibition_prio_field']);
        $startDate = (int) sanitize_text_field($_POST['mptab-exhibition_date_start_field']);
        $endDate = (int) sanitize_text_field($_POST['mptab-exhibition_date_end_field']);
        $startAlias = sanitize_text_field($_POST['mptab-exhibition_date_start_alias_field']);
        $endAlias = sanitize_text_field($_POST['mptab-exhibition_date_end_alias_field']);
        $permanent = isset($_POST['mptab-exhibition-is-permanent']);

        update_post_meta($postID, 'mptab-exhib-ev_prio', $prio);
        update_post_meta($postID, 'mptab-exhibition_date_start', $startDate);
        update_post_meta($postID, 'mptab-exhibition_date_end', $endDate);
        update_post_meta($postID, 'mptab-exhibition_date_start_alias', $startAlias);
        update_post_meta($postID, 'mptab-exhibition_date_end_alias', $endAlias);
        update_post_meta($postID, 'mptab-exhibition-is-permanent', $permanent);
    }
    function save_event_post($postID)
    {
        if (! isset($_POST['mptab-event_date_nonce']) || ! isset($_POST['mptab-event_hour_nonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['mptab-event_date_nonce'], 'save_event_post') || ! wp_verify_nonce($_POST['mptab-event_hour_nonce'], 'save_event_post') || ! wp_verify_nonce($_POST['mptab-event_prio_nonce'], 'save_event_post')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['mptab-event_date_start_field']) || ! isset($_POST['mptab-event_date_end_field']) || ! isset($_POST['mptab-event_date_all_field']) || ! isset($_POST['mptab-event_date_alias_field']) || ! isset($_POST['mptab-event_hour_field'])) {
            return;
        }

        $prio = (int) sanitize_text_field($_POST['mptab-event_prio_field']);
        $startDate = (int) sanitize_text_field($_POST['mptab-event_date_start_field']);
        $endDate = (int) sanitize_text_field($_POST['mptab-event_date_end_field']);
        $allDates = sanitize_text_field($_POST['mptab-event_date_all_field']);
        $alias = sanitize_text_field($_POST['mptab-event_date_alias_field']);
        $hour = sanitize_text_field($_POST['mptab-event_hour_field']);

        update_post_meta($postID, 'mptab-exhib-ev_prio', $prio);
        update_post_meta($postID, 'mptab-event_date_start', $startDate);
        update_post_meta($postID, 'mptab-event_date_end', $endDate);
        update_post_meta($postID, 'mptab-event_date_all', $allDates);
        update_post_meta($postID, 'mptab-event_date_alias', $alias);
        update_post_meta($postID, 'mptab-event_hour', $hour);
    }

    function save_service_post($postID)
    {
        $order = get_post_meta($postID, 'mptab-service_order', true);

        if (is_numeric($order)) {
            update_post_meta($postID, 'mptab-service_order', $order);
        } else {
            update_post_meta($postID, 'mptab-service_order', 0);
        }
    }

    //Enqueue

    function admin_scripts($hook)
    {
        //settings scripts
        if ($hook == 'toplevel_page_mptab-settings') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/mptab_settings.asset.php';

            //Enqueue scripts
            wp_enqueue_script('mptab-settings', plugin_dir_url(__FILE__) . 'build/mptab_settings.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');
            wp_enqueue_style('mptab-settings', plugin_dir_url(__FILE__) . 'build/mptab_settings.css');

            //Set translation
            wp_set_script_translations('mptab-settings', 'mptab-domain', plugin_dir_path(__FILE__) . '/languages');
        }

        //service order scripts
        if ($hook == 'mptab_service_page_mptab-service-order') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/service_order.asset.php';

            //Enqueue scripts
            wp_enqueue_script('mptab-settings', plugin_dir_url(__FILE__) . 'build/service_order.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');
            wp_enqueue_style('mptab-settings', plugin_dir_url(__FILE__) . 'build/service_order.css');

            //Set translation
            wp_set_script_translations('mptab-settings', 'mptab-domain', plugin_dir_path(__FILE__) . '/languages');
        }

        //post editor scripts
        if ($hook != 'post.php' && $hook != 'post-new.php') {
            return;
        }
        if (get_post_type() == 'mptab_exhibition') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/exhibition_meta.asset.php';

            //Enqueue scripts
            wp_enqueue_script('mptab-exhibitions', plugin_dir_url(__FILE__) . 'build/exhibition_meta.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');

            //Set translation
            wp_set_script_translations('mptab-exhibitions', 'mptab-domain', plugin_dir_path(__FILE__) . '/languages');
        }
        if (get_post_type() == 'mptab_event') {
            //Grab dependencies
            $assets = include plugin_dir_path(__FILE__) . 'build/event_meta.asset.php';

            //Enqueue scripts
            wp_enqueue_script('mptab-events', plugin_dir_url(__FILE__) . 'build/event_meta.js', $assets['dependencies'], $assets['version'], true);

            //Enqueue styles
            wp_enqueue_style('wp-components');

            wp_enqueue_style('mptab-event-style', plugin_dir_url(__FILE__) . 'build/event_meta.css');

            //Set translation
            wp_set_script_translations('mptab-events', 'mptab-domain', plugin_dir_path(__FILE__) . '/languages');
        }
    }
    //RestAPI
    function custom_rest()
    {
        //Fields
        register_rest_field('mptab_exhibition', 'mptab_date', array(
            'get_callback' => array($this, 'rest_exhibition_date')
        ));
        register_rest_field('mptab_event', 'mptab_date', array(
            'get_callback' => array($this, 'rest_event_date')
        ));

        //Routes
        register_rest_route('mptab/v1', 'current_exhibition_event', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'rest_exhibition_event')
        ));
        register_rest_route('mptab/v1', 'services', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'rest_services')
        ));
        register_rest_route('mptab/v1', 'settings', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'rest_settings')
        ));
    }
    function rest_exhibition_date()
    {
        $meta = array(
            'permanent' => get_post_meta(get_the_ID(), 'mptab-exhibition-is-permanent', true),
            'dates' => array(
                array(
                    'date' => get_post_meta(get_the_ID(), 'mptab-exhibition_date_start', true)
                ),
                array(
                    'date' => get_post_meta(get_the_ID(), 'mptab-exhibition_date_end', true)
                )
            ),
            'alias' => array(
                get_post_meta(get_the_ID(), 'mptab-exhibition_date_start_alias', true),
                get_post_meta(get_the_ID(), 'mptab-exhibition_date_end_alias', true)
            ),
            'prio' => get_post_meta(get_the_ID(), 'mptab-exhibition_prio', true)
        );
        return $meta;
    }
    function rest_event_date()
    {
        $meta = array(
            'hours' => json_decode(get_post_meta(get_the_ID(), 'mptab-event_hour', true)),
            'dates' => json_decode(get_post_meta(get_the_ID(), 'mptab-event_date_all', true)),
            'alias' => array(get_post_meta(get_the_ID(), 'mptab-event_date_alias', true)),
            'prio' => get_post_meta(get_the_ID(), 'mptab-event_prio', true)
        );
        return $meta;
    }
    function rest_exhibition_event()
    {
        //current posts
        $exhibitionsCurrentQuery = new WP_Query(array(
            'post_type' => 'mptab_exhibition',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-exhibition_date_start',
                    'compare' => '<=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'mptab-exhibition_date_end',
                    'compare' => '>=',
                    'value' => date('Uv')
                )
            )
        ));

        $exhibitionsPermanentQuery = new WP_Query(array(
            'post_type' => 'mptab_exhibition',
            'posts_per_page' => -1,
            'meta_key' => 'mptab-exhibition-is-permanent',
            'meta_value' => 1
        ));

        $eventsCurrentQuery = new WP_Query(array(
            'post_type' => 'mptab_event',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-event_date_start',
                    'compare' => '<=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'mptab-event_date_end',
                    'compare' => '>=',
                    'value' => date('Uv')
                )
            )
        ));

        $allCurrentQuery = new WP_Query();
        $allCurrentQuery->posts = array_merge($eventsCurrentQuery->posts, $exhibitionsCurrentQuery->posts, $exhibitionsPermanentQuery->posts);
        $allCurrentQuery->post_count = count($allCurrentQuery->posts);

        $currentPosts = $this->exhibition_event_data($allCurrentQuery);

        //comming posts
        $daysInAdvanced = 14;

        $exhibitionsCommingQuery = new WP_Query(array(
            'post_type' => 'mptab_exhibition',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-exhibition_date_start',
                    'compare' => '<',
                    'value' => date('Uv') + (86400000 * $daysInAdvanced)
                ),
                array(
                    'key' => 'mptab-exhibition_date_start',
                    'compare' => '>',
                    'value' => date('Uv')
                )
            )
        ));
        $eventsCommingQuery = new WP_Query(array(
            'post_type' => 'mptab_event',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-event_date_start',
                    'compare' => '<',
                    'value' => date('Uv') + (86400000 * $daysInAdvanced)
                ),
                array(
                    'key' => 'mptab-event_date_start',
                    'compare' => '>',
                    'value' => date('Uv')
                )
            )
        ));

        $allCommingQuery = new WP_Query();
        $allCommingQuery->posts = array_merge($eventsCommingQuery->posts, $exhibitionsCommingQuery->posts);
        $allCommingQuery->post_count = count($allCommingQuery->posts);

        $commingPosts = $this->exhibition_event_data($allCommingQuery);
        return array(
            'current' => $currentPosts,
            'comming' => $commingPosts
        );
    }
    function exhibition_event_data($allPosts)
    {
        $posts = [];

        // sort post by priority
        usort($allPosts->posts, function ($a, $b) {
            //sort by priority num
            //events before exhib in respective prio num
            //no prio num sorts as medium priority
            //permanent exhib lowest priority if nothing else is stated
            $sort = 0;

            $aPrio = get_post_meta($a->ID, 'mptab-exhib-ev_prio', true);
            $bPrio = get_post_meta($b->ID, 'mptab-exhib-ev_prio', true);

            //set negative prio if permanent exhibition and no prio stated
            if ($aPrio == -10 && $a->post_type == 'mptab_exhibition' && get_post_meta($a->ID, 'mptab-exhibition-is-permanent', true)) {
                $aPrio  = -2;
            }
            if ($bPrio == -10 && $b->post_type == 'mptab_exhibition' && get_post_meta($b->ID, 'mptab-exhibition-is-permanent', true)) {
                $bPrio  = -2;
            }

            //set neutral prio if no prio stated
            if ($aPrio == -10) {
                $aPrio = 0;
            }
            if ($bPrio == -10) {
                $bPrio = 0;
            }

            //add more prio if event post type
            if ($a->post_type == 'mptab_event') {
                $aPrio = $aPrio + 0.5;
            }
            if ($b->post_type == 'mptab_event') {
                $bPrio = $bPrio + 0.5;
            }

            if ($aPrio > $bPrio) {
                $sort = -1;
            } elseif ($aPrio < $bPrio) {
                $sort = 1;
            }

            return $sort;
        });

        while ($allPosts->have_posts()) {
            $allPosts->the_post();
            $specialData = [];
            if (get_post_type() == 'mptab_exhibition') {
                $specialData = array(
                    'permanent' => get_post_meta(get_the_ID(), 'mptab-exhibition-is-permanent', true),
                    'dates' => array(
                        array(
                            'date' => get_post_meta(get_the_ID(), 'mptab-exhibition_date_start', true)
                        ),
                        array(
                            'date' => get_post_meta(get_the_ID(), 'mptab-exhibition_date_end', true)
                        )
                    ),
                    'alias' => array(
                        get_post_meta(get_the_ID(), 'mptab-exhibition_date_start_alias', true),
                        get_post_meta(get_the_ID(), 'mptab-exhibition_date_end_alias', true)
                    ),
                    'prio' => get_post_meta(get_the_ID(), 'mptab-exhibition_prio', true)
                );
            }
            if (get_post_type() == 'mptab_event') {

                $specialData = array(
                    'hours' => json_decode(get_post_meta(get_the_ID(), 'mptab-event_hour', true)),
                    'dates' => json_decode(get_post_meta(get_the_ID(), 'mptab-event_date_all', true)),
                    'alias' => array(get_post_meta(get_the_ID(), 'mptab-event_date_alias', true)),
                    'prio' => get_post_meta(get_the_ID(), 'mptab-event_prio', true)
                );
            }
            array_push($posts, array(
                'ID' => get_the_ID(),
                'post_type' => get_post_type(),
                'url' => get_permalink(),
                'title' => get_the_title(),
                'exerpt' => str_replace('[&hellip;]', '', get_the_excerpt()), // remove [...]
                'thumbnail' => get_the_post_thumbnail_url(), // get image obj insted
                ...$specialData
            ));
        }
        return $posts;
    }
    function rest_services()
    {
        $servicesQuery = new WP_Query(array(
            'post_type' => 'mptab_service',
            'posts_per_page' => -1,
            'orderby' => 'meta_value_number',
            'order' => 'ASC',
            'meta_key' => 'mptab-service_order'
        ));

        $posts = [];

        while ($servicesQuery->have_posts()) {
            $servicesQuery->the_post();
            array_push($posts, array(
                'ID' => get_the_ID(),
                'post_type' => get_post_type(),
                'url' => get_permalink(),
                'title' => get_the_title(),
                'exerpt' => str_replace('[&hellip;]', '', get_the_excerpt()), // remove [...]
                'thumbnail' => get_the_post_thumbnail_url(), // get image obj insted
                'order' => intval(get_post_meta(get_the_ID(), 'mptab-service_order', true)),
            ));
        }
        return $posts;
    }
    function rest_settings()
    {
        return array(
            'phone' => esc_attr(get_option('mptab_phone')),
            'adress' => array(
                "adress" => esc_attr(get_option('mptab_adress')),
                "city" => esc_attr(get_option('mptab_city')),
                "areacode" => esc_attr(get_option('mptab_areacode')),
                "latlng" => json_decode(get_option('mptab_latlng')),
            )
        );
    }

    //Sub page
    function init_admin_menu()
    {
        // General settings
        add_menu_page(
            __('Museum settings', 'mptab-domain'),
            __('Museum settings', 'mptab-domain'),
            'manage_options',
            'mptab-settings',
            array($this, 'mptab_settings'),
            'data:image/svg+xml;base64,' . base64_encode('<svg width="100%" height="100%" viewBox="0 0 2084 2084" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M1198.93,1187.78l-777.181,777.18c-12.429,12.43 -32.588,12.43 -45.017,0l-156.223,-156.222c-5.968,-5.968 -9.322,-14.068 -9.322,-22.509c-0.004,-8.444 3.354,-16.54 9.322,-22.509l78.675,-78.674l-288.04,-288.04c-12.432,-12.432 -12.432,-32.591 -0.003,-45.02l156.222,-156.223c5.969,-5.968 14.068,-9.323 22.509,-9.323c8.444,-0.003 16.54,3.355 22.512,9.327l288.04,288.039l40.687,-40.688l-287.917,-288.297c-12.426,-12.439 -12.41,-32.594 0.029,-45.021l156.322,-156.116c12.439,-12.426 32.595,-12.41 45.021,0.029l287.788,288.162l255.336,-255.335c-133.424,-223.292 -104.026,-517.078 88.197,-709.3c226.932,-226.933 595.411,-226.933 822.343,-0c226.933,226.932 226.933,595.41 0,822.343c-192.223,192.222 -486.009,221.62 -709.3,88.197Zm508.434,-709.674c-116.072,-116.072 -304.538,-116.072 -420.611,-0c-116.069,116.069 -116.072,304.538 0,420.61c116.073,116.072 304.542,116.069 420.611,0c116.072,-116.072 116.072,-304.538 -0,-420.61Z"/></svg>'),
            80
        );

        //Service order menu
        add_submenu_page(
            'edit.php?post_type=mptab_service',
            __('Order', 'mptab-domain'),
            __('Order', 'mptab-domain'),
            'manage_options',
            'mptab-service-order',
            array($this, 'service_order')
        );
    }

    //Settings
    function on_admin_init()
    {
        add_settings_section(
            'mptab_general_settings_section',
            __('Museum Settings', 'mptab-domain'),
            array($this, 'mptab_general_settings_section'),
            'mptab-settings'
        );
        // Phone
        register_setting('mptab_adress_settings_group', 'mptab_phone', array(
            'sanitize_callback' => array($this, 'sanitize_tel'),
            'default' => '0000-000 000'
        ));
        add_settings_field(
            'mptab_phone',
            __('Phone number', 'mptab-domain'),
            array($this, 'mptab_phone'),
            'mptab-settings',
            'mptab_general_settings_section'
        );

        add_settings_section(
            'mptab_adress_settings_section',
            __('Adress Settings', 'mptab-domain'),
            array($this, 'mptab_adress_settings_section'),
            'mptab-settings'
        );
        //Adress
        register_setting('mptab_adress_settings_group', 'mptab_adress', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));
        add_settings_field(
            'mptab_adress',
            __('Adress', 'mptab-domain'),
            array($this, 'mptab_adress'),
            'mptab-settings',
            'mptab_adress_settings_section'
        );
        //City
        register_setting('mptab_adress_settings_group', 'mptab_city', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));
        add_settings_field(
            'mptab_city',
            __('City', 'mptab-domain'),
            array($this, 'mptab_city'),
            'mptab-settings',
            'mptab_adress_settings_section'
        );
        //Area code
        register_setting('mptab_adress_settings_group', 'mptab_areacode', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));
        add_settings_field(
            'mptab_areacode',
            __('Area code', 'mptab-domain'),
            array($this, 'mptab_areacode'),
            'mptab-settings',
            'mptab_adress_settings_section'
        );
        //Lat lng
        register_setting('mptab_adress_settings_group', 'mptab_latlng', array(
            'description' => __('Area code', 'mptab-domain')
        ));
        add_settings_field(
            'mptab_latlng',
            __('Map', 'mptab-domain'),
            array($this, 'mptab_latlng'),
            'mptab-settings',
            'mptab_adress_settings_section'
        );
    }

    function sanitize_tel($input)
    {
        $sanitized = preg_replace('/[^0-9 \- ]/', '', $input); // removes anything that isn't numbers spaces or dashes
        return $sanitized;
    }

    function mptab_settings()
    {
    ?>
        <div class="wrap">
            <form action="options.php" method="POST">
                <?php
                settings_errors();
                settings_fields('mptab_adress_settings_group');
                do_settings_sections('mptab-settings');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    function mptab_general_settings_section() {}
    function mptab_adress_settings_section()
    {
    ?>
        <h3><?php __('Adress Settings', 'mptab-domain') ?></h3>
    <?php
    }
    function mptab_phone()
    {
    ?>
        <input name="mptab_phone" type="tel" value="<?php echo esc_attr(get_option('mptab_phone')) ?>">
    <?php
    }
    function mptab_adress()
    {
    ?>
        <input name="mptab_adress" type="text" value="<?php echo esc_attr(get_option('mptab_adress')) ?>">
    <?php
    }
    function mptab_city()
    {
    ?>
        <input name="mptab_city" type="text" value="<?php echo esc_attr(get_option('mptab_city')) ?>">
    <?php
    }
    function mptab_areacode()
    {
    ?>
        <input name="mptab_areacode" type="text" value="<?php echo esc_attr(get_option('mptab_areacode')) ?>">
    <?php
    }
    function mptab_latlng()
    {
    ?>
        <p id="mptab-settings-map-description" class="description"><?php _e('Mark the location by clicking on the map or searching.', 'mptab-domain') ?></p>
        <input name="mptab_latlng" type="text" value="<?php echo esc_attr(get_option('mptab_latlng')) ?>" style="display:none;">
        <div id="mptab-settings-adress-map"></div>
    <?php
    }

    function service_order()
    {
        if (isset($_POST['submit']) && $_POST['submit'] === 'Save changes') {
            $this->service_order_save();
        }

    ?>
        <h1><?php _e('Service order') ?></h1>
        <p id="mptab-service-order-description" class="description"><?php _e('Change the order of services by draging or clicking the arrows') ?></p>
        <div id="mptab-service-order"></div>
        <form method="POST">
            <?php wp_nonce_field('service_order_save', 'mptab_service_order_nonce') ?>
            <input id="mptab-service-order-data" name="mptab-service-order-data" type="text" value='<?php echo json_encode($this->rest_services()) ?>' style="display:none;">
            <p class="submit">
                <input type="submit" name="submit" id="submit" value="<?php _e('Save changes', 'mptab-domain') ?>" class="button button-primary">
            </p>

        </form>

        <?php
    }
    function service_order_save()
    {
        // check nonce and premissions
        if (!isset($_POST['mptab_service_order_nonce']) || !wp_verify_nonce($_POST['mptab_service_order_nonce'], 'service_order_save') || !current_user_can('manage_options')) {
        ?>
            <div class="error">
                <p><?php _e('You do not have access to edit this data', 'mptab-domain') ?></p>
            </div>
        <?php
            return;
        }

        // check if there is any service order data and if it is valid json
        if (!isset($_POST['mptab-service-order-data']) || !json_validate(stripslashes($_POST['mptab-service-order-data']))) {
        ?>
            <div class="error">
                <p><?php _e('No valid data found', 'mptab-domain') ?></p>
            </div>
            <?php
            return;
        }

        $data = $_POST['mptab-service-order-data'];
        $data = stripslashes($data);
        $data = json_decode($data, true);
        foreach ($data as $item) {
            // check if current service has valid id and order number
            if (!isset($item['order']) || !($item['order'] || $item['order'] == 0) || !is_int($item['order']) || !isset($item['id']) || !$item['id'] || !is_int($item['id'])) {
            ?>
                <div class="error">
                    <p><?php _e('No valid data found for', 'mptab-domain') ?>: <?php echo esc_html($item['title']) ?></p>
                </div>
            <?php
                return;
            }

            // check if post exist and is service
            if (!get_post_status($item['id']) || get_post_type($item['id']) != 'mptab_service') {
            ?>
                <div class="error">
                    <p><?php echo esc_html($item['title']) ?> <?php _e('is not a service', 'mptab-domain') ?></p>
                </div>
        <?php
                return;
            }

            // set order for current service
            update_post_meta($item['id'], 'mptab-service_order', $item['order']);
        }

        ?>
        <div class="updated">
            <p><?php _e('Saved', 'mptab-domain') ?></p>
        </div>
<?php

    }
}


$pluginBoilerplate = new PluginBoilerplate();
