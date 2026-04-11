# Current Database Schema Analysis for iRBbA Devs

Below is a clear, structured explanation of **your existing schema** (the SQL you just provided). I have mapped every table to the specific sections and pages of your website (based on the HTML files you shared earlier). This follows the same professional format I used when explaining the schema I designed previously.

## Overall Schema Characteristics

- **Primary Key Style**: Uses `varchar(36)` (UUID-style) for all IDs.
- **Naming Convention**: British spelling (`organisations`, `date_created`/`date_updated`).
- **Strengths**: Very strong RBAC (Role-Based Access Control) system with fine-grained modules and permissions. Good for an enterprise-grade SaaS platform.
- **Multi-Tenancy**: Handled via the `organisations` table (linked to subscriptions and future operational data).

### 1. Access Control & User Management

These tables form the core authentication and permission system.

| Table | Purpose | Applies to Website Pages / Sections |
|------------------------|-------------------------------------------------------------------------|-------------------------------------|
| `users` | Stores all users (staff, customers, admins) with basic profile data. | Login areas, Contact/Demo forms, Subscription, About Us (team), Admin dashboard |
| `roles` | Defines roles (e.g. Admin, Sales, Support, Customer). | User management in future dashboard; controls access across the platform |
| `modules` | Defines system modules (e.g. HosCare, Blog, Pricing, etc.). | Future role-based navigation and feature access |
| `permissions` | Granular permissions (e.g. "view_blog", "manage_subscriptions"). | RBAC enforcement on admin and customer portals |
| `role_modules` | Links roles to modules. | Permission system for different user types |
| `module_permissions` | Links modules to specific permissions. | Fine-grained control |
| `user_modules` | Direct module access for individual users. | Override/role exceptions |
| `user_permissions` | Direct permissions for individual users. | Override/role exceptions |
| `user_roles` | Assigns roles to users. | Core user role assignment |
| `forgot` | Password reset codes and expiry. | Forgot password flow (any login page) |

**Website Impact**: Powers any authenticated section (future customer portal, admin panel, and secure forms on demo.html / subscription.html).

---

### 2. Legal & Compliance

| Table | Purpose | Applies to Website Pages / Sections |
|----------------------|----------------------------------------------|-------------------------------------|
| `legal_documents` | Stores Privacy Policy, Terms of Service, Cookie Policy, etc. | privacy-policy.html, terms-of-service.html, cookie-policy.html, footer links on all pages |

**Website Impact**: Directly powers the legal pages and footer links.


### 3. Product Catalog

| Table | Purpose | Applies to Website Pages / Sections |
|----------------------|----------------------------------------------|-------------------------------------|
| `products` | Main product catalog (HosCare, EduManage Pro, etc.) | products.html, product-hoscare.html, index.html (Featured Product) |
| `product_features` | Features for each product | products.html #hoscare section, product-hoscare.html feature modules |
| `pricing_plans` | Starter / Professional / Enterprise plans | pricing.html, subscription.html, products.html pricing tables |

**Website Impact**: Fully powers the entire Products section and pricing pages.

### 4. Subscriptions & Billing

| Table            | Purpose                                      | Applies to Website Pages / Sections |
|------------------|----------------------------------------------|-------------------------------------|
| `subscriptions`  | Client subscriptions (linked to organisation) | subscription.html, pricing.html, future customer portal |
| `payments`       | Payment records                              | Subscription flow, billing history |

**Website Impact**: Powers subscription.html form processing and pricing.html.

### 5. Content Management

| Table                  | Purpose                                      | Applies to Website Pages / Sections |
|------------------------|----------------------------------------------|-------------------------------------|
| `team_members`         | Team profiles                                | about.html → “Meet the Team” section |
| `blog_categories`      | Blog categories                              | blog.html (category filters) |
| `blog_posts`           | Blog articles                                | blog.html, blog-digital-transformation.html |
| `testimonials`         | Customer testimonials                        | index.html (testimonials), product pages |
| `timeline_events`      | Company journey / milestones                 | about.html → “Our Journey” timeline |

**Website Impact**: Makes the About, Blog, and Home pages dynamic.

### 6. Inquiry Management

| Table         | Purpose                                      | Applies to Website Pages / Sections |
|---------------|----------------------------------------------|-------------------------------------|
| `inquiries`   | All contact/demo/support requests            | contact.html, demo.html, subscription.html forms |

**Website Impact**: Captures every form submission across the site.

### 7. Organisations (Multi-Tenancy Core)

| Table             | Purpose                                      | Applies to Website Pages / Sections |
|-------------------|----------------------------------------------|-------------------------------------|
| `organisations`   | Client / company records (hotels, schools, etc.) | All multi-tenant data, subscriptions, future HosCare operations |

**Website Impact**: Central tenant table. Used by subscriptions and will be used by HosCare operational data.

### Key Observations & Recommendations

**Strengths of Your Current Schema**:

- Extremely robust RBAC system (ideal for enterprise SaaS).
- Consistent use of UUID primary keys.
- Good separation of legal content.
- Already includes most marketing/content tables.
  