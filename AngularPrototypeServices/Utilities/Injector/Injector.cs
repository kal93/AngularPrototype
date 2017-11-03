using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Installer;

namespace PatientInquiryLogger
{
    /// <summary>
    /// Injector class
    /// </summary>
    public static class Injector
    {
        private static readonly object InstanceLock = new object();
        //Private member
        private static IWindsorContainer instance;
        /// <summary>
        /// Instance of IWindsorContainer
        /// </summary>
        public static IWindsorContainer Instance
        {
            get
            {
                lock (InstanceLock)
                {
                    return instance ?? (instance = GetInjector());
                }
            }
        }

        /// <summary>
        /// Method to create an object for WindsorContainer
        /// </summary>
        /// <returns>Container</returns>
        private static IWindsorContainer GetInjector()
        {
            var container = new WindsorContainer();

            container.Install(FromAssembly.This());

            RegisterInjector(container);

            return container;
        }

        /// <summary>
        /// Method to register interfaces 
        /// </summary>
        /// <param name="container">class to register interface</param>
        private static void RegisterInjector(WindsorContainer container)
        {
            //Registering Interface to a specific class
            container.Register(Component.For<ILog>().ImplementedBy<Logger>().LifestyleTransient());

        }

    }
}