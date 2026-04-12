-- Host: localhost    
-- Database: irbba_devs_db
-- User: root
-- Password: (empty)
-- Date: 2026-04-11 12:00:00

-- =============================================
-- 1. ACCESS CONTROL & USER MANAGEMENT
-- =============================================
CREATE TABLE
    `users` (
        `user_id` varchar(36) NOT NULL,
        `first_name` varchar(68) DEFAULT NULL,
        `last_name` varchar(68) DEFAULT NULL,
        `contact` varchar(10) DEFAULT NULL,
        `email` varchar(128) NOT NULL,
        `password` varchar(255) NOT NULL,
        `status` enum('Active', 'Inactive') DEFAULT 'Active',
        `gps_address` varchar(12) DEFAULT NULL,
        `street_name` varchar(128) DEFAULT NULL,
        `date_created` datetime DEFAULT NULL,
        `date_updated` datetime DEFAULT NULL,
        PRIMARY KEY (`user_id`)
    );

CREATE TABLE
    `roles` (
        `role_id` varchar(36) NOT NULL,
        `role_name` varchar(50) NOT NULL,
        `description` text,
        `is_active` tinyint(1) DEFAULT '1',
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`role_id`),
        UNIQUE KEY `role_name` (`role_name`),
        INDEX `idx_created_by` (`created_by`),
        CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
    );

CREATE TABLE
    `modules` (
        `module_id` varchar(36) NOT NULL,
        `module_name` varchar(128) NOT NULL,
        `description` text,
        `is_active` tinyint(1) DEFAULT '1',
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        `is_sales_service` tinyint(1) DEFAULT '0',
        PRIMARY KEY (`module_id`),
        UNIQUE KEY `module_name` (`module_name`),
        INDEX `idx_created_by` (`created_by`),
        CONSTRAINT `modules_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `permissions` (
        `permission_id` varchar(36) NOT NULL,
        `permission_name` varchar(50) NOT NULL,
        `description` text,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`permission_id`),
        UNIQUE KEY `permission_name` (`permission_name`),
        INDEX `idx_created_by` (`created_by`),
        CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
    );

CREATE TABLE
    `role_modules` (
        `role_module_id` varchar(36) NOT NULL,
        `role_id` varchar(36) NOT NULL,
        `module_id` varchar(36) NOT NULL,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`role_module_id`),
        UNIQUE KEY `role_module_unique` (`role_id`, `module_id`),
        INDEX `idx_module_id` (`module_id`),
        INDEX `idx_created_by` (`created_by`),
        CONSTRAINT `role_modules_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
        CONSTRAINT `role_modules_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE,
        CONSTRAINT `role_modules_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `module_permissions` (
        `module_permission_id` varchar(36) NOT NULL,
        `module_id` varchar(36) NOT NULL,
        `permission_id` varchar(36) NOT NULL,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`module_permission_id`),
        UNIQUE KEY `module_id` (`module_id`, `permission_id`),
        INDEX `idx_permission_id` (`permission_id`),
        INDEX `idx_created_by` (`created_by`),
        CONSTRAINT `module_permissions_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE,
        CONSTRAINT `module_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE,
        CONSTRAINT `module_permissions_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `user_modules` (
        `user_module_id` varchar(36) NOT NULL,
        `user_id` varchar(36) NOT NULL,
        `module_id` varchar(36) NOT NULL,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`user_module_id`),
        UNIQUE KEY `user_module_unique` (`user_id`, `module_id`),
        INDEX `idx_created_by` (`created_by`),
        INDEX `idx_user_modules_user_id` (`user_id`),
        INDEX `idx_user_modules_module_id` (`module_id`),
        CONSTRAINT `user_modules_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
        CONSTRAINT `user_modules_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE,
        CONSTRAINT `user_modules_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `user_permissions` (
        `user_permission_id` varchar(36) NOT NULL,
        `user_id` varchar(36) NOT NULL,
        `permission_id` varchar(36) NOT NULL,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`user_permission_id`),
        UNIQUE KEY `user_permission_unique` (`user_id`, `permission_id`),
        INDEX `idx_created_by` (`created_by`),
        INDEX `idx_user_permissions_user_id` (`user_id`),
        INDEX `idx_user_permissions_permission_id` (`permission_id`),
        CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
        CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE,
        CONSTRAINT `user_permissions_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `user_roles` (
        `user_role_id` varchar(36) NOT NULL,
        `user_id` varchar(36) NOT NULL,
        `role_id` varchar(36) NOT NULL,
        `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`user_role_id`),
        UNIQUE KEY `user_role_unique` (`user_id`, `role_id`),
        INDEX `idx_created_by` (`created_by`),
        INDEX `idx_user_roles_user_id` (`user_id`),
        INDEX `idx_user_roles_role_id` (`role_id`),
        CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
        CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
        CONSTRAINT `user_roles_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `forgot` (
        `forgot_id` varchar(36) NOT NULL,
        `user_id` varchar(36) NOT NULL,
        `code` varchar(6) NOT NULL,
        `expire` int NOT NULL,
        `date_created` datetime DEFAULT NULL,
        PRIMARY KEY (`forgot_id`),
        INDEX `idx_expire` (`expire`),
        INDEX `idx_user_id` (`user_id`),
        INDEX `idx_code` (`code`)
    );

-- =============================================
-- 2. LEGAL & COMPLIANCE  
-- =============================================

CREATE TABLE `legal_documents` (
    `legal_id` varchar(36) PRIMARY KEY,
    `document_type` ENUM('policy', 'service', 'other') NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `content` LONGTEXT NOT NULL,
    `last_updated` DATE NOT NULL,
    `effective_date` DATE NOT NULL,
    `version` VARCHAR(20) NULL,
    `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_type` (`document_type`)
);

-- =============================================
-- 3. PRODUCT CATALOG
-- =============================================
CREATE TABLE
    `products` (
        `product_id` varchar(36) PRIMARY KEY,
        `slug` VARCHAR(100) NOT NULL UNIQUE,
        `product_name` VARCHAR(128) NOT NULL,
        `description` TEXT NOT NULL,
        `status` ENUM('live', 'upcoming', 'beta') NOT NULL DEFAULT 'upcoming',
        `launch_date` DATE NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    `product_features` (
        `product_feature_id` varchar(36) PRIMARY KEY,
        `product_id` varchar(36) NOT NULL,
        `feature_name` VARCHAR(128) NOT NULL,
        `description` TEXT NULL,
        `is_core` BOOLEAN NOT NULL DEFAULT FALSE,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
        INDEX `idx_product` (`product_id`)
    );

CREATE TABLE
    `pricing_plans` (
        `pricing_plan_id` varchar(36) PRIMARY KEY,
        `product_id` varchar(36) NOT NULL,
        `plan_name` VARCHAR(128) NOT NULL, -- Starter, Professional, Enterprise
        `monthly_price` DECIMAL(10, 2) NOT NULL,
        `yearly_price` DECIMAL(10, 2) NOT NULL,
        `max_users` INT UNSIGNED NOT NULL,
        `max_properties` INT UNSIGNED NULL, -- for hospitality
        `is_popular` BOOLEAN NOT NULL DEFAULT FALSE,
        `description` TEXT NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
    );

-- =============================================
-- 4. SUBSCRIPTIONS & BILLING
-- =============================================
CREATE TABLE
    `subscriptions` (
        `subscription_id` varchar(36) PRIMARY KEY,
        `organisation_id` VARCHAR(36) NOT NULL,
        `product_id` varchar(36) NOT NULL,
        `pricing_plan_id` varchar(36) NOT NULL,
        `status` ENUM(
            'trial',
            'active',
            'cancelled',
            'expired',
            'past_due'
        ) NOT NULL DEFAULT 'active',
        `billing_cycle` ENUM('monthly', 'yearly') NOT NULL DEFAULT 'monthly',
        `start_date` DATE NOT NULL,
        `end_date` DATE NULL,
        `next_billing_date` DATE NULL,
        `cancelled_at` TIMESTAMP NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`organisation_id`) ON DELETE CASCADE,
        FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT,
        FOREIGN KEY (`pricing_plan_id`) REFERENCES `pricing_plans` (`pricing_plan_id`) ON DELETE RESTRICT
    );

CREATE TABLE
    `payments` (
        `payment_id` varchar(36) PRIMARY KEY,
        `subscription_id` varchar(36) NOT NULL,
        `amount` DECIMAL(10, 2) NOT NULL,
        `currency` CHAR(3) NOT NULL DEFAULT 'GHS',
        `payment_method` VARCHAR(50) NULL,
        `transaction_id` VARCHAR(255) NULL,
        `status` ENUM('pending', 'success', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
        `paid_at` TIMESTAMP NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`subscription_id`) ON DELETE CASCADE
    );

-- =============================================
-- 5. CONTENT MANAGEMENT
-- =============================================
CREATE TABLE
    `team_members` (
        `team_member_id` varchar(36) PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `role` VARCHAR(150) NOT NULL,
        `bio` TEXT NULL,
        `avatar_url` VARCHAR(255) NULL,
        `linkedin_url` VARCHAR(255) NULL,
        `twitter_url` VARCHAR(255) NULL,
        `github_url` VARCHAR(255) NULL,
        `dribbble_url` VARCHAR(255) NULL,
        `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    `blog_categories` (
        `blog_category_id` varchar(36) PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `slug` VARCHAR(100) NOT NULL UNIQUE,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    `blog_posts` (
        `blog_post_id` varchar(36) PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `slug` VARCHAR(255) NOT NULL UNIQUE,
        `excerpt` TEXT NULL,
        `content` LONGTEXT NOT NULL,
        `author_id` varchar(36) NULL, -- links to users or separate author table
        `category_id` varchar(36) NULL,
        `published` BOOLEAN NOT NULL DEFAULT FALSE,
        `date_published` TIMESTAMP NULL,
        `views` INT UNSIGNED NOT NULL DEFAULT 0,
        `featured` BOOLEAN NOT NULL DEFAULT FALSE,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`blog_category_id`) ON DELETE SET NULL,
        FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
        INDEX `idx_published` (`published`, `date_published`)
    );

CREATE TABLE
    `testimonials` (
        `testimonial_id` varchar(36) PRIMARY KEY,
        `author_name` VARCHAR(150) NOT NULL,
        `author_title` VARCHAR(150) NULL,
        `organisation_name` VARCHAR(255) NULL,
        `text` TEXT NOT NULL,
        `rating` TINYINT UNSIGNED NULL CHECK (`rating` BETWEEN 1 AND 5),
        `product_id` varchar(36) NULL,
        `approved` BOOLEAN NOT NULL DEFAULT TRUE,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL
    );

CREATE TABLE
    `timeline_events` (
        `timeline_event_id` varchar(36) PRIMARY KEY,
        `year` YEAR NOT NULL,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT NOT NULL,
        `icon_class` VARCHAR(100) NULL,
        `milestone_type` ENUM(
            'founding',
            'launch',
            'milestone',
            'expansion',
            'other'
        ) NOT NULL DEFAULT 'other',
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_year_order (`year`),
        INDEX idx_type (`milestone_type`)
    );

-- =============================================
-- 6.  INQUIRY MANAGEMENT
-- =============================================
CREATE TABLE
    `inquiries` (
        `inquiry_id` varchar(36) PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `phone` VARCHAR(15) NULL,
        `organisation_name` VARCHAR(255) NULL,
        `subject` VARCHAR(255) NULL,
        `message` TEXT NOT NULL,
        `type` ENUM(
            'contact',
            'demo',
            'support',
            'partnership',
            'general'
        ) NOT NULL DEFAULT 'general',
        `status` ENUM('new', 'contacted', 'qualified', 'closed') NOT NULL DEFAULT 'new',
        `assigned_to` varchar(36) NULL,
        `product_interest` varchar(36) NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
        FOREIGN KEY (`product_interest`) REFERENCES `products` (`product_id`) ON DELETE SET NULL,
        INDEX `idx_type_status` (`type`, `status`)
    );

CREATE TABLE
    `organisations` (
        `organisation_id` VARCHAR(36) PRIMARY KEY,
        `organisation_name` VARCHAR(255) NOT NULL,
        `organisation_type` ENUM(
            'hotel',
            'resort',
            'guesthouse',
            'hostel',
            'pub',
            'bar',
            'restaurant',
            'club',
            'beach',
            'school',
            'college',
            'bank',
            'government',
            'ngo',
            'enterprise',
            'shop',
            'mall',
            'other'
        ) NOT NULL,
        `address` TEXT NULL,
        `city` VARCHAR(100) NULL,
        `country` VARCHAR(100) NOT NULL DEFAULT 'Ghana',
        `phone` VARCHAR(15) NULL,
        `website` VARCHAR(255) NULL,
        `size` ENUM('1-10', '11-50', '51-200', '201-500', '500+') NULL,
        `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `date_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_type` (`organisation_type`),
        INDEX `idx_country` (`country`)
    );

-- =============================================
-- 7.  TAX & ACCOUNTING
-- =============================================
CREATE TABLE `tax_profile_modules` (
  `tax_profile_module_id` varchar(36) NOT NULL,
  `tax_profile_id` varchar(36) NOT NULL,
  `module_id` varchar(36) NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(36) NOT NULL,
  PRIMARY KEY (`tax_profile_module_id`),
  UNIQUE KEY `tax_profile_module` (`tax_profile_id`,`module_id`),
  INDEX `idx_created_by` (`created_by`),
  INDEX `idx_tax_profile_modules_module_profile` (`module_id`,`tax_profile_id`),
  CONSTRAINT `tax_profile_modules_ibfk_1` FOREIGN KEY (`tax_profile_id`) REFERENCES `tax_profiles` (`tax_profile_id`) ON DELETE CASCADE,
  CONSTRAINT `tax_profile_modules_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE,
  CONSTRAINT `tax_profile_modules_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `tax_profile_rates` (
  `tax_profile_rate_id` varchar(36) NOT NULL,
  `tax_profile_id` varchar(36) NOT NULL,
  `tax_rate_id` varchar(36) NOT NULL,
  `sequence` int NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(36) NOT NULL,
  PRIMARY KEY (`tax_profile_rate_id`),
  UNIQUE KEY `tax_profile_id` (`tax_profile_id`,`tax_rate_id`),
  INDEX `idx_tax_rate_id` (`tax_rate_id`),
  INDEX `idx_created_by` (`created_by`),
  CONSTRAINT `tax_profile_rates_ibfk_1` FOREIGN KEY (`tax_profile_id`) REFERENCES `tax_profiles` (`tax_profile_id`) ON DELETE CASCADE,
  CONSTRAINT `tax_profile_rates_ibfk_2` FOREIGN KEY (`tax_rate_id`) REFERENCES `tax_rates` (`tax_rate_id`) ON DELETE CASCADE,
  CONSTRAINT `tax_profile_rates_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `tax_profiles` (
  `tax_profile_id` varchar(36) NOT NULL,
  `tax_profile_name` varchar(128) NOT NULL,
  `tax_type` enum('exclusive','inclusive') NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`tax_profile_id`),
  UNIQUE KEY `tax_profile_name_module` (`tax_profile_name`),
  INDEX `idx_created_by` (`created_by`),
  INDEX `idx_tax_profiles_is_default` (`is_default`),
  CONSTRAINT `tax_profiles_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `tax_rates` (
  `tax_rate_id` varchar(36) NOT NULL,
  `tax_rate_name` varchar(128) DEFAULT NULL,
  `tax_rate_value` decimal(5,2) NOT NULL,
  `base_step` varchar(16) NOT NULL,
  `effective_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `rate_status` tinyint(1) DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tax_rate_id`),
  UNIQUE KEY `tax_rate_name` (`tax_rate_name`)
);

CREATE TABLE `tax_transaction_details` (
  `tax_transaction_detail_id` varchar(36) NOT NULL,
  `tax_transaction_id` varchar(36) NOT NULL,
  `tax_rate_id` varchar(36) NOT NULL,
  `tax_rate_name` varchar(128) NOT NULL,
  `tax_rate_value` decimal(5,2) NOT NULL,
  `base_step` varchar(16) NOT NULL,
  `base_amount` decimal(10,2) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `sequence` int NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tax_transaction_detail_id`),
  INDEX `idx_tax_transaction_id` (`tax_transaction_id`),
  INDEX `idx_tax_rate_id` (`tax_rate_id`),
  INDEX `idx_sequence` (`sequence`),
  INDEX `idx_tax_transaction_details_composite` (`tax_transaction_id`,`sequence`),
  CONSTRAINT `tax_transaction_details_ibfk_1` FOREIGN KEY (`tax_transaction_id`) REFERENCES `tax_transactions` (`tax_transaction_id`) ON DELETE CASCADE,
  CONSTRAINT `tax_transaction_details_ibfk_2` FOREIGN KEY (`tax_rate_id`) REFERENCES `tax_rates` (`tax_rate_id`) ON DELETE RESTRICT
);

CREATE TABLE `tax_transactions` (
  `tax_transaction_id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `order_type` enum('pos','ecommerce','buffet','conference') NOT NULL,
  `order_source` varchar(50) DEFAULT 'manual',
  `tax_profile_id` varchar(36) NOT NULL,
  `tax_type` enum('exclusive','inclusive') NOT NULL,
  `tax_selection_source` varchar(50) DEFAULT 'module_default',
  `net_amount` decimal(10,2) NOT NULL,
  `total_tax` decimal(10,2) NOT NULL,
  `gross_total` decimal(10,2) NOT NULL,
  `calculation_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tax_transaction_id`),
  UNIQUE KEY `unique_order_tax` (`order_id`,`order_type`),
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_order_type` (`order_type`),
  INDEX `idx_tax_profile_id` (`tax_profile_id`),
  INDEX `idx_calculation_timestamp` (`calculation_timestamp`),
  INDEX `idx_tax_transactions_composite` (`order_type`,`tax_profile_id`,`calculation_timestamp`),
  CONSTRAINT `tax_transactions_ibfk_1` FOREIGN KEY (`tax_profile_id`) REFERENCES `tax_profiles` (`tax_profile_id`) ON DELETE RESTRICT
);