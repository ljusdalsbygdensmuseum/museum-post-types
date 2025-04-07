<?php
/*
 * Plugin Name:       Museum post types
 * Description:       Posttypes and blocks that fit any museum
 * Version:           0.1.0
 * Author:            Ina Eklund
 * Text Domain:       mptab-domain
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
        $exhibition_args = array(
            'labels' => array(
                'name' => __('Exhibitions', 'mptab_domain'),
                'singular_name' => __('Exhibition', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('exhibition', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('exhibitions', 'mptab-domain'),
                'archives' => __('Exhibition', 'mptab-domain') . ' ' . __('archives', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('exhibitions', 'mptab_domain')),
            'menu_icon' => 'dashicons-admin-site-alt',
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
        );
        register_post_type('mptab_exhibition', $exhibition_args);

        $event_args = array(
            'labels' => array(
                'name' => __('Events', 'mptab_domain'),
                'singular_name' => __('Event', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('event', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('events', 'mptab-domain'),
                'archives' => __('Event', 'mptab-domain') . ' ' . __('archives', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('events', 'mptab_domain')),
            'menu_icon' => 'dashicons-schedule',
            'public' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail')
        );
        register_post_type('mptab_event', $event_args);

        $service_args = array(
            'labels' => array(
                'name' => __('Services', 'mptab_domain'),
                'singular_name' => __('Service', 'mptab-domain'),
                'add_new_item' => __('Add new', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'edit_item' => __('Edit', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'new_item' => __('New', 'mptab-domain') . ' ' . __('service', 'mptab-domain'),
                'view_items' => __('View', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'search_items' => __('Search', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'all_items' => __('All', 'mptab-domain') . ' ' . __('services', 'mptab-domain'),
                'archives' => __('Service', 'mptab-domain') . ' ' . __('archives', 'mptab-domain'),
            ),
            'rewrite' => array('slug' => __('services', 'mptab_domain')),
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
    }

    //Metaboxes

    function init_meta_boxes()
    {
        add_meta_box('mptab-exhibition-date', __('Dates', 'mptab-domain'), array($this, 'metabox_exhibition_date'), 'mptab_exhibition', 'side', 'default');

        add_meta_box('mptab-event-hour', __('Hours', 'mptab-domain'), array($this, 'metabox_event_hour'), 'mptab_event', 'side', 'default');
        add_meta_box('mptab-event-date', __('Dates', 'mptab-domain'), array($this, 'metabox_event_date'), 'mptab_event', 'side', 'default');
    }
    function metabox_exhibition_date($post)
    {
        wp_nonce_field('save_exhibition_post', 'mptab-exhibition-date-nonce');

        $startDate = get_post_meta($post->ID, 'mptab-exhibition-date-start', true);
        $endDate = get_post_meta($post->ID, 'mptab-exhibition-date-end', true);
        $startAlias = get_post_meta($post->ID, 'mptab-exhibition-date-start-alias', true);
        $endAlias = get_post_meta($post->ID, 'mptab-exhibition-date-end-alias', true);
        $permanent = get_post_meta($post->ID, 'mptab-exhibition-is-permanent', true);
?>
        <div class="exhibition-date-meta">
            <div class="mptab-exhibition-daterange" id="mptab-exhibition-daterange"></div>
            <input type="number" name="mptab-exhibition-date-start-field" id="mptab-exhibition-date-start-field" value="<?php esc_attr_e($startDate, 'mptab-domain') ?>" style="display:none;">
            <input type=" number" name="mptab-exhibition-date-end-field" id="mptab-exhibition-date-end-field" value="<?php esc_attr_e($endDate, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-exhibition-date-start-alias-field" id="mptab-exhibition-date-start-alias-field" value="<?php esc_attr_e($startAlias, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-exhibition-date-end-alias-field" id="mptab-exhibition-date-end-alias-field" value="<?php esc_attr_e($endAlias, 'mptab-domain') ?>" style="display:none;">
            <input type="checkbox" name="mptab-exhibition-is-permanent" id="mptab-exhibition-is-permanent" <?php echo ($permanent) ? 'checked' : '' ?> style="display:none;">
        </div>
    <?php
    }
    function metabox_event_hour($post)
    {
        wp_nonce_field('save_event_post', 'mptab-event-hour-nonce');

        $time = get_post_meta($post->ID, 'mptab-event-time', true);

    ?>
        <div class="event-date-meta">
            <div class="mptab-event-hour-select" id="mptab-event-hour-select"></div>
            <input type="text" name="mptab-event-time-field" id="mptab-event-time-field" value="<?php esc_attr_e($time, 'mptab-domain') ?>" style="display:none;">
        </div>
    <?php
    }
    function metabox_event_date($post)
    {
        wp_nonce_field('save_event_post', 'mptab-event-date-nonce');

        $startDate = get_post_meta($post->ID, 'mptab-event-date-start', true);
        $endDate = get_post_meta($post->ID, 'mptab-event-date-end', true);
        $allDates = get_post_meta($post->ID, 'mptab-event-date-all', true);
        $alias = get_post_meta($post->ID, 'mptab-event-date-alias', true);

    ?>
        <div class="event-date-meta">
            <div class="mptab-event-date-select" id="mptab-event-date-select"></div>
            <input type="number" name="mptab-event-date-start-field" id="mptab-event-date-start-field" value="<?php esc_attr_e($startDate, 'mptab-domain') ?>" style="display:none;">
            <input type="number" name="mptab-event-date-end-field" id="mptab-event-date-end-field" value="<?php esc_attr_e($endDate, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-event-date-all-field" id="mptab-event-date-all-field" value="<?php esc_attr_e($allDates, 'mptab-domain') ?>" style="display:none;">
            <input type="text" name="mptab-event-date-alias-field" id="mptab-event-date-alias-field" value="<?php esc_attr_e($alias, 'mptab-domain') ?>" style="display:none;">
        </div>
    <?php
    }

    //Save posts

    function save_exhibition_post($postID)
    {
        if (! isset($_POST['mptab-exhibition-date-nonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['mptab-exhibition-date-nonce'], 'save_exhibition_post')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['mptab-exhibition-date-start-field']) || ! isset($_POST['mptab-exhibition-date-end-field']) || ! isset($_POST['mptab-exhibition-date-start-alias-field']) || ! isset($_POST['mptab-exhibition-date-end-alias-field'])) {
            return;
        }

        $startDate = (int) sanitize_text_field($_POST['mptab-exhibition-date-start-field']);
        $endDate = (int) sanitize_text_field($_POST['mptab-exhibition-date-end-field']);
        $startAlias = sanitize_text_field($_POST['mptab-exhibition-date-start-alias-field']);
        $endAlias = sanitize_text_field($_POST['mptab-exhibition-date-end-alias-field']);
        $permanent = isset($_POST['mptab-exhibition-is-permanent']);

        update_post_meta($postID, 'mptab-exhibition-date-start', $startDate);
        update_post_meta($postID, 'mptab-exhibition-date-end', $endDate);
        update_post_meta($postID, 'mptab-exhibition-date-start-alias', $startAlias);
        update_post_meta($postID, 'mptab-exhibition-date-end-alias', $endAlias);
        update_post_meta($postID, 'mptab-exhibition-is-permanent', $permanent);
    }
    function save_event_post($postID)
    {
        if (! isset($_POST['mptab-event-date-nonce']) || ! isset($_POST['mptab-event-hour-nonce'])) {
            return;
        }
        if (! wp_verify_nonce($_POST['mptab-event-date-nonce'], 'save_event_post') || ! wp_verify_nonce($_POST['mptab-event-hour-nonce'], 'save_event_post')) {
            return;
        }
        if (! current_user_can('edit_post', $postID)) {
            return;
        }
        if (! isset($_POST['mptab-event-date-start-field']) || ! isset($_POST['mptab-event-date-end-field']) || ! isset($_POST['mptab-event-date-all-field']) || ! isset($_POST['mptab-event-date-alias-field']) || ! isset($_POST['mptab-event-time-field'])) {
            return;
        }

        $startDate = (int) sanitize_text_field($_POST['mptab-event-date-start-field']);
        $endDate = (int) sanitize_text_field($_POST['mptab-event-date-end-field']);
        $allDates = sanitize_text_field($_POST['mptab-event-date-all-field']);
        $alias = sanitize_text_field($_POST['mptab-event-date-alias-field']);
        $time = sanitize_text_field($_POST['mptab-event-time-field']);

        update_post_meta($postID, 'mptab-event-date-start', $startDate);
        update_post_meta($postID, 'mptab-event-date-end', $endDate);
        update_post_meta($postID, 'mptab-event-date-all', $allDates);
        update_post_meta($postID, 'mptab-event-date-alias', $alias);
        update_post_meta($postID, 'mptab-event-time', $time);
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
    function rest_exhibition_event()
    {
        //current posts
        $exhibitionsCurrentQuery = new WP_Query(array(
            'post_type' => 'mptab_exhibition',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-exhibition-date-start',
                    'compare' => '<=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'mptab-exhibition-date-end',
                    'compare' => '>=',
                    'value' => date('Uv')
                )
            )
        ));
        $eventsCurrentQuery = new WP_Query(array(
            'post_type' => 'mptab_event',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-event-date-start',
                    'compare' => '<=',
                    'value' => date('Uv')
                ),
                array(
                    'key' => 'mptab-event-date-end',
                    'compare' => '>=',
                    'value' => date('Uv')
                )
            )
        ));

        $allCurrentQuery = new WP_Query();
        $allCurrentQuery->posts = array_merge($exhibitionsCurrentQuery->posts, $eventsCurrentQuery->posts);
        $allCurrentQuery->post_count = count($allCurrentQuery->posts);

        $currentPosts = $this->exhibition_event_data($allCurrentQuery);

        //comming posts
        $daysInAdvanced = 14;

        $exhibitionsCommingQuery = new WP_Query(array(
            'post_type' => 'mptab_exhibition',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'mptab-exhibition-date-start',
                    'compare' => '<',
                    'value' => date('Uv') + (86400000 * $daysInAdvanced)
                ),
                array(
                    'key' => 'mptab-exhibition-date-start',
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
                    'key' => 'mptab-event-date-start',
                    'compare' => '<',
                    'value' => date('Uv') + (86400000 * $daysInAdvanced)
                ),
                array(
                    'key' => 'mptab-event-date-start',
                    'compare' => '>',
                    'value' => date('Uv')
                )
            )
        ));

        $allCommingQuery = new WP_Query();
        $allCommingQuery->posts = array_merge($exhibitionsCommingQuery->posts, $eventsCommingQuery->posts);
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

        while ($allPosts->have_posts()) {
            $allPosts->the_post();
            $specialData = [];
            if (get_post_type() == 'mptab_exhibition') {
                $specialData = array(
                    'permanent' => get_post_meta(get_the_ID(), 'mptab-exhibition-is-permanent', true),
                    'dates' => array(
                        array(
                            'date' => get_post_meta(get_the_ID(), 'mptab-exhibition-date-start', true)
                        ),
                        array(
                            'date' => get_post_meta(get_the_ID(), 'mptab-exhibition-date-end', true)
                        )
                    ),
                    'alias' => array(
                        get_post_meta(get_the_ID(), 'mptab-exhibition-date-start-alias', true),
                        get_post_meta(get_the_ID(), 'mptab-exhibition-date-start-alias', true)
                    )
                );
            }
            if (get_post_type() == 'mptab_event') {

                $specialData = array(
                    'hours' => json_decode(get_post_meta(get_the_ID(), 'mptab-event-time', true)),
                    'dates' => json_decode(get_post_meta(get_the_ID(), 'mptab-event-date-all', true)),
                    'alias' => array(get_post_meta(get_the_ID(), 'mptab-event-date-alias', true))
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
            ));
        }
        return $posts;
    }
    function rest_settings()
    {
        return array(
            'phone' => esc_attr(get_option('mptab_phone'))
        );
    }

    //Sub page
    function init_admin_menu()
    {
        add_menu_page(
            __('Museum settings', 'mptab-domain'),
            __('Museum settings', 'mptab-domain'),
            'manage_options',
            'mptab-settings',
            array($this, 'mptab_settings'),
            'data:image/svg+xml;base64,' . base64_encode('<svg width="20" height="20" viewBox="0 0 255.463 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; "><clipPath id="_clip1"><rect x="0" y="0" width="255.463" height="500" /></clipPath><g clip-path="url(#_clip1)"><path d="M159.15,252.589l0,241.419c0,3.861 -3.131,6.992 -6.992,6.992l-48.528,-0c-1.854,-0 -3.633,-0.737 -4.944,-2.048c-1.312,-1.311 -2.048,-3.09 -2.048,-4.944l-0,-24.439l-89.475,0c-3.862,0 -6.993,-3.131 -6.993,-6.992l0,-48.528c0,-1.854 0.737,-3.633 2.048,-4.944c1.311,-1.312 3.09,-2.048 4.945,-2.048l89.475,-0l-0,-12.639l-89.496,-0.059c-3.862,-0.002 -6.99,-3.135 -6.988,-6.997l0.032,-48.527c0.002,-3.862 3.135,-6.99 6.997,-6.988l89.455,0.058l-0,-79.316c-55.404,-13.958 -96.468,-64.154 -96.468,-123.865c0,-70.493 57.231,-127.724 127.724,-127.724c70.493,0 127.724,57.231 127.724,127.724c-0,59.711 -41.064,109.907 -96.468,123.865Zm-31.256,-189.193c-36.056,-0 -65.328,29.272 -65.328,65.328c-0,36.055 29.272,65.328 65.328,65.328c36.056,0 65.328,-29.273 65.328,-65.328c0,-36.056 -29.272,-65.328 -65.328,-65.328Z"/></g></svg>'),
            80
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
        register_setting('mptab_general_settings_group', 'mptab_phone', array(
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
        //Adress
        register_setting('mptab_general_settings_group', 'mptab_adress', array(
            'sanitize_callback' => array($this, 'sanitize_tel'),
            'default' => 'test'
        ));
        add_settings_field(
            'mptab_adress',
            __('Adress', 'mptab-domain'),
            array($this, 'mptab_adress'),
            'mptab-settings',
            'mptab_general_settings_section'
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
                settings_fields('mptab_general_settings_group');
                do_settings_sections('mptab-settings');
                submit_button();
                ?>
            </form>
        </div>
    <?php
    }

    function mptab_general_settings_section() {}
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
        <div id="mptab-settings-adress-map"></div>
<?php
    }
}


$pluginBoilerplate = new PluginBoilerplate();
