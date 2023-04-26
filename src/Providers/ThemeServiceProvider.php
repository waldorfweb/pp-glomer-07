<?php
namespace Waldorfshop7\Providers;

use Plenty\Modules\Webshop\ItemSearch\Helpers\ResultFieldTemplate;
use Plenty\Modules\Webshop\Template\Providers\TemplateServiceProvider;
use Plenty\Modules\ContentCache\Contracts\ContentCacheQueryParamsRepositoryContract;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\Templates\Twig;
use Plenty\Plugin\ConfigRepository;
use IO\Helper\ComponentContainer;
use Waldorfshop7\Middlewares\ThemeMiddleware;

/**
 * Class ThemeServiceProvider
 * @package Waldorfshop7\Providers
 */
class ThemeServiceProvider extends TemplateServiceProvider
{
    const PRIORITY = 0;

    public function register()
    {
        $this->getApplication()->register(ThemeRouteServiceProvider::class);
        $this->addGlobalMiddleware(ThemeMiddleware::class);
    }

    public function boot(Twig $twig, Dispatcher $dispatcher, ConfigRepository $config)
    {
        $this->overrideTemplate('Ceres::Category.Macros.CategoryTree', 'Waldorfshop7::Category.Macros.CategoryTree');
        $this->overrideTemplate('Ceres::PageDesign.PageDesign', 'Waldorfshop7::PageDesign.PageDesign');
        $this->overrideTemplate('Ceres::PageDesign.Partials.Footer', 'Waldorfshop7::PageDesign.Partials.Footer');
        $this->overrideTemplate('Ceres::PageDesign.Partials.Head', 'Waldorfshop7::PageDesign.Partials.Head');
        $this->overrideTemplate('Ceres::Widgets.Category.ItemGridWidget', 'Waldorfshop7::Widgets.Category.ItemGridWidget');
        $this->overrideTemplate('Ceres::Widgets.Common.ItemListWidget', 'Waldorfshop7::Widgets.Common.ItemListWidget');
        $this->overrideTemplate('Ceres::Widgets.Header.TopBarWidget', 'Waldorfshop7::Widgets.Header.TopBarWidget');
        $this->overrideTemplate('Ceres::Widgets.Item.ItemImageWidget', 'Waldorfshop7::Widgets.Item.ItemImageWidget');

//        $dispatcher->listen("IO.Resources.Import", function(ResourceContainer $container)
//        {
//            $container->addScriptTemplate('Waldorfshop7::ItemList.Components.CategoryItem');
//        },0);

        $dispatcher->listen('IO.Component.Import', function (ComponentContainer $container)
        {
            if ($container->getOriginComponentTemplate()=='Ceres::Customer.Components.UserLoginHandler')
            {
                $container->setNewComponentTemplate('Waldorfshop7::Customer.Components.UserLoginHandler');
            }
        }, self::PRIORITY);

        /** @var ResultFieldTemplate $resultFieldTemplate */
        $resultFieldTemplate = pluginApp(ResultFieldTemplate::class);
        $resultFieldTemplate->setTemplates([
            ResultFieldTemplate::TEMPLATE_CATEGORY_TREE   => 'Waldorfshop7::ResultFields.CategoryTree'
        ]);

        /** @var ContentCacheQueryParamsRepositoryContract $contentCacheQueryParamsRepository */
        $contentCacheQueryParamsRepository = pluginApp(ContentCacheQueryParamsRepositoryContract::class);
        $contentCacheQueryParamsRepository->registerExcluded([
            'gclid',
            'dclid',
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_term',
            'utm_content',
            'wbraid',
            'fbclid',

            'vmtrack_id',
            'vmst_id',
            'idealoid',
            'li_fat_id',
            'msclkid',
        ]);
    }
}