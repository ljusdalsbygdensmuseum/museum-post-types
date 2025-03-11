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

        //enqueue
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
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
    }
    function init_meta_boxes()
    {
        add_meta_box('mptab-exhibition-date', __('Dates', 'mptab-domain'), array($this, 'metabox_exhibition_date'), 'mptab_exhibition', 'side', 'default');
    }
    function metabox_exhibition_date($post)
    {
        wp_nonce_field('save_exhibition_post', 'mptab-exhibition-date-nonce');

        $startDate = get_post_meta($post->ID, 'mptab-exhibition-date-start', true);
        $endDate = get_post_meta($post->ID, 'mptab-exhibition-date-end', true);
        $startAlias = get_post_meta($post->ID, 'mptab-exhibition-date-start-alias', true);
        $endAlias = get_post_meta($post->ID, 'mptab-exhibition-date-end-alias', true);
?>
        <div class="exhibition-date-meta">
            <div class="mptab-exhibition-daterange" id="mptab-exhibition-daterange"></div>
            <input type="number" name="mptab-exhibition-date-start-field" id="mptab-exhibition-date-start-field" value="<?php esc_attr_e($startDate, 'mptab-domain') ?>" style="display:none;">
            <input type=" number" name="mptab-exhibition-date-end-field" id="mptab-exhibition-date-end-field" value="<?php esc_attr_e($endDate, 'mptab-domain') ?>" style="display:none;">
            <label for=" mptab-exhibition-date-start-alias-field"><?php _e('Start Alias', 'mptab-domain') ?></label>
            <input type="text" name="mptab-exhibition-date-start-alias-field" id="mptab-exhibition-date-start-alias-field" value="<?php esc_attr_e($startAlias, 'mptab-domain') ?>">
            <label for="mptab-exhibition-date-end-alias-field"><?php _e('End Alias', 'mptab-domain') ?></label>
            <input type="text" name="mptab-exhibition-date-end-alias-field" id="mptab-exhibition-date-end-alias-field" value="<?php esc_attr_e($endAlias, 'mptab-domain') ?>">
        </div>
<?php
    }
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

        update_post_meta($postID, 'mptab-exhibition-date-start', $startDate);
        update_post_meta($postID, 'mptab-exhibition-date-end', $endDate);
        update_post_meta($postID, 'mptab-exhibition-date-start-alias', $startAlias);
        update_post_meta($postID, 'mptab-exhibition-date-end-alias', $endAlias);
    }

    function admin_scripts($hook)
    {
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
    }
}


$pluginBoilerplate = new PluginBoilerplate();
